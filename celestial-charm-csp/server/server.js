import express, { json, urlencoded } from 'express';
import cors from 'cors';
const app = express();
import forgotPasswordRoute from './routes/forgot-password.js';
import quizRoutes from './routes/quizRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import authRouter from './routes/auth.js';
import pkg from 'mongoose';
const { connection, connect, createConnection } = pkg;
import cookieParser from 'cookie-parser';
require('dotenv').config();

app.set('trust proxy', 1);
app.use(cookieParser());
app.use(json({ limit: '10mb' }));
app.use(urlencoded({ extended: true, limit: '10mb' }));

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
app.use('/api', require('./routes/productItemsRoutes').default);
app.use('/api/users', require('./routes/users').default);
app.use('/api', require('./routes/productsRoutes').default);
app.use('/api/forgot-username', require('./routes/forgot-username').default);
app.use('/api/forgot-password', forgotPasswordRoute);
app.use('/api/quiz', quizRoutes);
app.use('/api/store', storeRoutes);


app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.get('/api/dbcheck', async (_req, res) => {
    try { await connection.db.admin().ping(); res.json({ db: 'ok' }); }
    catch (e) { res.status(500).json({ db: 'down', message: e.message }); }
});

app.use((err, req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: err?.message || 'Server error' });
});

(async () => {
    try {
        await connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 20000 });
        console.log("✅ Mongo connected");
        app.listen(process.env.PORT, () => console.log("Server is running on port", process.env.PORT));
    } catch (err) {
        console.error("❌ Mongo connect failed:", err.message);
        process.exit(1);
    }
})();

// secondDb.js
export const secondDbConnection = createConnection(process.env.SECOND_MONGODB_URI, { serverSelectionTimeoutMS: 20000 });
secondDbConnection.on('error', console.error.bind(console, 'Mongo error:'));
secondDbConnection.once('open', () => console.log('Second Mongo connected'));

// thirdDb.js
export const thirdDbConnection = createConnection(process.env.THIRD_MONGODB_URI, { serverSelectionTimeoutMS: 20000 });
thirdDbConnection.on('error', console.error.bind(console, 'Mongo error:'));
thirdDbConnection.once('open', () => console.log('Third Mongo connected'));


// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// });
