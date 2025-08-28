import { Router } from 'express';
const router = Router();
import { verifyToken } from '../middleware/authMiddleware.js'; // Import the auth middleware
import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://ahezekiah:RedLights@celestial-charm.jmhlund.mongodb.net/';
const client = new MongoClient(uri);
const quizDbName = 'celestial-charm-quizzes';
const userDBName = 'authentication';

let mongoReady = null;
const ensureMongoConnection = async () => {
    if (!mongoReady) {
        mongoReady = client.connect().catch(err => {
            mongoReady = null; // Reset on failure
            throw err;
        });
    }
    return mongoReady;
};


router.post('/personality', verifyToken, async (req, res) => {
    try {
        const { answers, result } = req.body;
        const userId = req.user.id; // Get user ID from the token

        await client.connect();
        const db = client.db(quizDbName);
        const users = client.db(userDBName).collection('users');

        await db.collection('personalityResults').insertOne({
            userId,
            answers,
            result,
            createdAt: new Date(),
        });

        await users.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { personalityType: result } }
        );

        res.status(200).json({ message: 'Personality results saved & profile updated!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save results' });
    }
});

router.post('/knowledge', verifyToken, async (req, res) => {
    try {
        const { answers, score } = req.body;
        const userId = req.user.id; // Get user ID from the token
        const gems = Math.floor(score);

        await client.connect();
        const db = client.db(quizDbName);
        const users = client.db(userDBName).collection('users');
        

        await db.collection('knowledgeResults').insertOne({
            userId,
            answers,
            score,
            gems,
            createdAt: new Date(),
        });

        await users.updateOne(
            { _id: new ObjectId(userId) },
            { $inc: { gems } }
        );

        res.status(200).json({ message: `Knowledge score results saved. Gems earned: ${gems}` });
    } catch (error) {
        console.error('Error saving results:', error);
        res.status(500).json({ error: 'Failed to save results' });
    }
});


// GET /api/quiz/personality/latest
router.get('/personality/latest', verifyToken, async (req, res) => {
    try {
        await ensureMongoConnection();
        const db = client.db(quizDbName);
        const doc = await db.collection('personalityResults')
            .find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(1)
            .toArray();

        return res.json({ ok: true, latest: doc[0] || null });
    } catch (err) {
        console.error('personality/latest error', err);
        return res.status(500).json({ ok: false, error: 'Failed to load latest personality result' });
    }
});

// POST /api/quiz/personality/submit
// body: { personalityType: string, details?: object }
router.post('/personality/submit', verifyToken, async (req, res) => {
    const userId = req.user.id;
    const { personalityType, details = {} } = req.body || {};
    if (!personalityType) {
        return res.status(400).json({ ok: false, error: 'personalityType is required' });
    }

    try {
        await ensureMongoConnection();
        const db = client.db(quizDbName); 
        const usersDb = client.db(userDBName);   
        
        // history log
        await db.collection('personalityResults').insertOne({
            userId,
            personalityType,
            details,
            createdAt: new Date()
        });

        // reflect on user profile
        await usersDb.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            { $set: { personalityType } }
        );

        return res.json({ ok: true, personalityType });
    } catch (err) {
        console.error('personality/submit error', err);
        return res.status(500).json({ ok: false, error: 'Failed to save personality result' });
    }
});

// GET /api/quiz/personality/results?limit=20
router.get('/personality/results', verifyToken, async (req, res) => {
    const { limit = 20 } = req.query;
    try {
        await ensureMongoConnection();
        const db = client.db(quizDbName);
        const items = await db.collection('personalityResults')
            .find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .project({ _id: 0 })
            .toArray();

        return res.json({ ok: true, results: Array.isArray(items) ? items : [] });
    } catch (err) {
        console.error('personality/results error', err);
        return res.status(500).json({ ok: false, error: 'Failed to load personality results', results: [] });
    }
});


// GET /api/quiz/knowledge/questions?difficulty=easy|medium|hard&limit=10
router.get('/knowledge/questions', async (req, res) => {
    const { difficulty = 'easy', limit = 10 } = req.query;
    try {
        await ensureMongoConnection();
        const db = client.db(quizDbName);
        const filter = { difficulty: new RegExp(`^${difficulty}$`, 'i') };
        let questions = [];
        try {
            questions = await db.collection('knowledgeQuestions').aggregate([
            { $match: filter },
            { $sample: { size: Number(limit) } },
            { $project: { correct: 0 } }
        ]).toArray();
        } catch (e) {
            questions = await db.collection('knowledgeQuestions')
            .find(filter).limit(Number(limit)).toArray();
        }

        res.json({  ok: true, difficulty, count: questions.length, questions: Array.isArray(questions) ? questions : []  });
    } catch (error) {
        console.error("🔥 Error in /api/quiz/knowledge/questions:", error);
        res.status(500).json({ ok: false, error: 'Failed to fetch questions' });
    }
});

// POST /api/quiz/knowledge/submit
// body: { difficulty, score, total }
router.post('/knowledge/submit', verifyToken, async (req, res) => {
    const { difficulty = 'easy', answers = {} } = req.body;
    const userId = req.user.id; // Get user ID from the token
    try {
        await ensureMongoConnection();
        const db = client.db(quizDbName);
        const usersDb = client.db(userDBName);

        const ids = Object.keys(answers).map(id => new ObjectId(id));
        const docs = await db.collection('knowledgeQuestions')
            .find({ _id: { $in: ids } }).toArray();

        let score = 0;
        docs.forEach(q => {
            if (answers[q._id.toString()] === q.correct) score++;
        });

        const total = docs.length;
        const base = {easy: 10, medium: 20, hard: 30};
        const multiplier = base[String(difficulty).toLowerCase()] ?? 10; // Default to easy if not found
        const earnedGems = Math.max(0, Math.round((score / Math.max(1, total)) * multiplier));

        await db.collection('knowledgeResults').insertOne({
            userId,
            difficulty,
            score,
            total,
            earnedGems,
            createdAt: new Date(),
        });

        await usersDb.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            { $inc: { gems: earnedGems } }
        );

        res.json({ ok: true, score, total, earnedGems, message: `Knowledge quiz submitted. Score: ${score} out of ${total}! Gems earned: ${earnedGems}`,  });
    } catch (error) {
        console.error("🔥 Error in /api/quiz/knowledge/submit:", error);
        res.status(500).json({ ok: false, error: 'Failed to submit knowledge quiz' });
    }
});

// GET /api/quiz/results?difficulty=all|easy|medium|hard&limit=20
router.get('/knowledge/results', verifyToken, async (req, res) => {
    const { difficulty = 'all', limit = 20 } = req.query;
    try {
        await ensureMongoConnection();
        const db = client.db(quizDbName);

        const filter = { userId: req.user.id };
        if (difficulty !== 'all') {
        filter.difficulty = new RegExp(`^${difficulty}$`, 'i');
        }

        const items = await db.collection('knowledgeResults')
        .find(filter)
        .sort({ createdAt: -1 })
        .limit(Number(limit))
        .project({ _id: 0 }) // keep it light
        .toArray();

        // Always return an array
        return res.json({ ok: true, results: Array.isArray(items) ? items : [] });
    } catch (err) {
        console.error('quiz/results error', err);
        return res.status(500).json({ ok: false, error: 'Failed to load results', results: [] });
    }
});

export default router;