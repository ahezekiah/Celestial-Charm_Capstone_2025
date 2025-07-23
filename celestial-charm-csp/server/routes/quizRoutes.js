const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://ahezekiah:RedLights@celestial-charm.jmhlund.mongodb.net/';
const client = new MongoClient(uri);
const dbName = 'celestial-charm-quizzes';

router.post('/personality', async (req, res) => {
    const { userId, answers, result } = req.body;

    if (!userId || !answers || !result) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('personalityResults');

        await collection.insertOne({
            userId,
            answers,
            result,
            timestamp: new Date(),
        });
        res.status(200).json({ message: 'Results saved' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save results' });
    }
});

module.exports = router;