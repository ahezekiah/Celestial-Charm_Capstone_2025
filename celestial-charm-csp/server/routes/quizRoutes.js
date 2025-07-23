const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware'); // Import the auth middleware
const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb+srv://ahezekiah:RedLights@celestial-charm.jmhlund.mongodb.net/';
const client = new MongoClient(uri);
const dbName = 'celestial-charm-quizzes';

router.post('/personality', verifyToken, async (req, res) => {
    try {
        const { answers, result } = req.body;
        const userId = req.user.id; // Get user ID from the token

        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('personalityResults');

        await collection.insertOne({
            userId,
            answers,
            result,
            createdAt: new Date(),
        });

        await db.collection("users").updateOne(
            { _id: new ObjectId(userId) },
            { $set: { personalityType: result } }
        );

        res.status(200).json({ message: 'Personality results saved' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save results' });
    }
});

router.post('/knowledge', verifyToken, async (req, res) => {
    try {
        const { answers, score } = req.body;
        const userId = req.user.id; // Get user ID from the token
        const gems = score;

        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('knowledgeResults');

        await collection.insertOne({
            userId,
            answers,
            score,
            gems,
            createdAt: new Date(),
        });

        await db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            { $inc: { gems: correctCount } }
        );

        res.status(200).json({ message: 'Knowledge results saved' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save results' });
    }
});

router.get('/results', verifyToken, async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);

        const personality = await db
            .collection('personalityResults')
            .find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .toArray();

        const knowledge = await db
            .collection('knowledgeResults')
            .find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .toArray();

        res.json({ personality, knowledge });
    } catch (error) {
        console.error("🔥 Error in /api/quiz/results:", error);
        res.status(500).json({ error: 'Failed to fetch results' })
    }
});

module.exports = router;