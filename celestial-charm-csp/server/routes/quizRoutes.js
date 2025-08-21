const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware'); // Import the auth middleware
const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb+srv://ahezekiah:RedLights@celestial-charm.jmhlund.mongodb.net/';
const client = new MongoClient(uri);
const quizDbName = 'celestial-charm-quizzes';
const userDBName = 'authentication';

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

// GET /api/quiz/knowledge/questions?difficulty=easy|medium|hard&limit=10
router.get('/knowledge/questions', async (req, res) => {
    const { difficulty = 'easy', limit = 10 } = req.query;
    try {
        await client.connect();
        const db = client.db(quizDbName);
        const filter = { difficulty: new RegExp(`^${difficulty}$`, 'i') };
        const questions = await db.collection('knowledgeQuestions').aggregate([
            { $match: filter },
            { $sample: { size: Number(limit) } },
            { $project: { _id: 0, question: 1, options: 1, answer: 0 } }
        ]).toArray();
        res.json({ difficulty, count: questions.length, questions });
    } catch (error) {
        console.error("🔥 Error in /api/quiz/knowledge/questions:", error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});

// POST /api/quiz/knowledge/submit { difficulty, score, total }
router.post('/knowledge/submit', verifyToken, async (req, res) => {
    const { difficulty = 'easy', score = 0, total = 0 } = req.body;
    const userId = req.user.id; // Get user ID from the token
    try {
        await client.connect();
        const db = client.db(quizDbName);
        const usersDb = client.db(userDBName);

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

        res.json({ ok: true, message: `Knowledge quiz submitted. Gems earned: ${earnedGems}` });
    } catch (error) {
        console.error("🔥 Error in /api/quiz/knowledge/submit:", error);
        res.status(500).json({ error: 'Failed to submit knowledge quiz' });
    }
});

router.get('/results', verifyToken, async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);

        console.log('UserID from token:', req.user.id);
        
        const personality = await db
            .collection('personalityResults')
            .find({ userId })
            .toArray();

        const knowledge = await db
            .collection('knowledgeResults')
            .find({ userId })
            .toArray();

        res.json({ personality, knowledge });
    } catch (error) {
        console.error("🔥 Error in /api/quiz/results:", error);
        res.status(500).json({ error: 'Failed to fetch results' })
    }
});

module.exports = router;