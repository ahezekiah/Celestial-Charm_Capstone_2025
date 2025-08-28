const express = require('express');
const cors = require('cors');
const app = express();
const forgotPasswordRoute = require('./routes/forgot-password');
const quizRoutes = require('./routes/quizRoutes');
const storeRoutes = require('./routes/storeRoutes');
const authRouter = require('./routes/auth.js');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.set('trust proxy', 1);
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// const ORIGINS = (process.env.FRONTEND_ORIGIN || 'https://celestial-charm.shop, https://www.celestial-charm.shop')
//     .split(',')
//     .map(s => s.trim())
//     .filter(Boolean);


// app.use(cors({
//     origin: (origin, cb) => {
//         if (!origin) return cb(null, true);
//         if (ORIGINS.includes(origin)) return cb(null, true);
//         return cb(new Error('CORS blocked'));
//     },
//     credentials: true
// }));
const ORIGINS = [
    'https://celestial-charm.shop',
    'https://www.celestial-charm.shop',
    'https://celestial-charm-capstone-2025.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
];
const allow = (o) =>
    !o ||
    ORIGINS.includes(o) ||
    /^https?:\/\/([a-z0-9-]+\.)?celestial-charm\.shop$/i.test(o);

app.use(cors({ origin: (o, cb) => cb(null, allow(o)), credentials: true }));
app.options('*', cors({ origin: (o, cb) => cb(null, allow(o)), credentials: true }));

app.use('/auth', authRouter);
app.use('/api/auth', authRouter);
// app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/productItemsRoutes'));
app.use('/api/users', require('./routes/users'));
app.use('/api', require('./routes/productsRoutes'));
app.use('/api/forgot-username', require('./routes/forgot-username'));
app.use('/api/forgot-password', forgotPasswordRoute);
app.use('/api/quiz', quizRoutes);
app.use('/api/store', storeRoutes);


app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.get('/api/dbcheck', async (_req, res) => {
    try { await mongoose.connection.db.admin().ping(); res.json({ db: 'ok' }); }
    catch (e) { res.status(500).json({ db: 'down', message: e.message }); }
});

app.use((err, req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: err?.message || 'Server error' });
});

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 20000 });
        console.log("✅ Mongo connected");
        app.listen(process.env.PORT, () => console.log("Server is running on port", process.env.PORT));
    } catch (err) {
        console.error("❌ Mongo connect failed:", err.message);
        process.exit(1);
    }
})();

// secondDb.js
module.exports = mongoose.createConnection(process.env.SECOND_MONGODB_URI, { serverSelectionTimeoutMS: 20000 });

// thirdDb.js
const conn = mongoose.createConnection(process.env.THIRD_MONGODB_URI, { serverSelectionTimeoutMS: 20000 });
conn.on('error', console.error.bind(console, 'Mongo error:'));
conn.once('open', () => console.log('Third Mongo connected'));
module.exports = conn;


// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// });
