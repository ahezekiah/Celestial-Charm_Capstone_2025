require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://ahezekiah:RedLights@celestial-charm.jmhlund.mongodb.net/';
const client = new MongoClient(uri);
const dbName = 'celestial-charm-quizzes';

const data = [
  // EASY
    { question: "Which K-pop group released 'Pink Venom'?", 
        options: ['BLACKPINK','TWICE','ITZY','IVE'],
        correct: 'BLACKPINK', 
        difficulty: 'easy' },
    { question: "What is the full name of the MC of Demon Slayer?", 
        options: ['Tanjiro Kamado', 'Satoru Gojo', 'Izuku Midoriya', 'Monkey D. Luffy'], 
        correct: 'Tanjiro Kamado', 
        difficulty: 'easy' },
    { question: "What is Deku's real name from 'My Hero Academia'?",
        options: ['Izuku Midoriya', 'Katsuki Bakugo', 'Shoto Todoroki', 'All Might'],
        correct: 'Izuku Midoriya',
        difficulty: 'easy' },

    // MEDIUM
    { question: "LE SSERAFIM debuted with which song?", 
        options: ['Antifragile','Fearless','Hype Boy','Ditto'], 
        correct: 'Fearless', 
        difficulty: 'medium' },
    { question: "In 'Attack on Titan', who has the Founding Titan power?",
        options: ['Eren Yeager', 'Mikasa Ackerman', 'Armin Arlert', 'Levi Ackerman'],
        correct: 'Eren Yeager',
        difficulty: 'medium' },
    { question: 'Which K-pop boy group performed at Coachella 2024?',
        options: ['BTS', 'Stray Kids', 'ATEEZ', 'ENHYPEN'],
        correct: 'ATEEZ',
        difficulty: 'medium' },

    // HARD
    { question: "Who choreographed much of BTS’s early style?", 
        options: ['Son Sung Deuk','Pdogg','Bang PD','Slow Rabbit'], 
        correct: 'Son Sung Deuk', 
        difficulty: 'hard' },
    { question: "Which mangaka created Chainsaw Man?", 
        options: ['Tatsuki Fujimoto','Gege Akutami','Eiichiro Oda','Hajime Isayama'], 
        correct: 'Tatsuki Fujimoto', 
        difficulty: 'hard' },
    { question: "From the anime 'Jujutsu Kaisen', what does the term 領域展開 (Ryōiki Tenkai) mean'?",
        options: ['Domain Expansion', 'Cursed Technique', 'Shinigami Power', 'Spirit Bomb'],
        correct: 'Domain Expansion',
        difficulty: 'hard' },
    ];

(async () => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('knowledgeQuestions');

        await col.createIndex({ difficulty: 1 });

        for (const q of data) {
            await col.updateOne(
                { question: q.question },   // match by text
                { $setOnInsert: q },
                { upsert: true }
            );
        }

    console.log('✅ Knowledge questions seeded (upserted).');
    } catch (e) {
        console.error(e);
        
    } finally {
        await client.close();
        process.exit(0);
    }
})();
