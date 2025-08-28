import express, { json, urlencoded } from 'express';
import cors from 'cors';
const app = express();
import forgotPasswordRoute from './routes/forgot-password.js';
import quizRoutes from './routes/quizRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import authRouter from './routes/auth.js';
import productItemsRoutes from './routes/productItemsRoutes.js';
import usersRoutes from './routes/users.js';
import productsRoutes from './routes/productsRoutes.js';
import forgotUsernameRoute from './routes/forgot-username.js';
import pkg from 'mongoose';
const { connection, connect, createConnection } = pkg;
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import { requireAuth } from './middleware/requireAuth.js';
import morgan from 'morgan';

app.use(morgan('tiny'));

app.use(json({ limit: '10mb' }));
app.use(urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());



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
app.set('trust proxy', 1);
app.options('*', cors({ origin: (o, cb) => cb(null, allow(o)), credentials: true }));

app.get('/api/health', (req, res) => {
    res.status(200).json({ ok: true, uptime: process.uptime() });
});
app.get('/api/dbcheck', async (_req, res) => {
    try { await connection.db.admin().ping(); res.json({ db: 'ok' }); }
    catch (e) { res.status(500).json({ db: 'down', message: e.message }); }
});

// app.use('/auth',  authRouter);
app.use('/api/auth', authRouter);
app.use('/api',  productItemsRoutes);
app.use('/api/users', requireAuth, usersRoutes);
app.use('/api', productsRoutes);
app.use('/api/forgot-username',  forgotUsernameRoute);
app.use('/api/forgot-password',  forgotPasswordRoute);
app.use('/api/quiz', requireAuth, quizRoutes);
app.use('/api/store', requireAuth, storeRoutes);





app.use((err, req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: err?.message || 'Server error' });
});

(async () => {
    try {
        await connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 20000 });
        console.log("✅ Mongo connected");
        // app.listen(process.env.PORT, () => console.log("Server is running on port", process.env.PORT));
    } catch (err) {
        console.error("❌ Mongo connect failed:", err.message);
        process.exit(1);
    }
})();

// secondDb.js
export const firstDbConnection = createConnection(process.env.FIRST_MONGODB_URI, { serverSelectionTimeoutMS: 20000 });
// secondDbConnection.on('error', console.error.bind(console, 'Mongo error:'));
firstDbConnection.once('open', () => console.log('First Mongo connected'));

// secondDb.js
export const secondDbConnection = createConnection(process.env.SECOND_MONGODB_URI, { serverSelectionTimeoutMS: 20000 });
// secondDbConnection.on('error', console.error.bind(console, 'Mongo error:'));
secondDbConnection.once('open', () => console.log('Second Mongo connected'));

// thirdDb.js
export const thirdDbConnection = createConnection(process.env.THIRD_MONGODB_URI, { serverSelectionTimeoutMS: 20000 });
// thirdDbConnection.on('error', console.error.bind(console, 'Mongo error:'));
thirdDbConnection.once('open', () => console.log('Third Mongo connected'));


// const PORT = || 10000;
app.listen(process.env.PORT , () => {
    console.log(`API listening on ${process.env.PORT }`);
});