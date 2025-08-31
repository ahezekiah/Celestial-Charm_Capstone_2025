import express, { json, urlencoded } from 'express';
import cors from 'cors';
import pkg from 'mongoose';
const { connection, connect } = pkg;
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import morgan from 'morgan';

const app = express();
app.set('trust proxy', 1);
app.use(morgan('tiny'));
app.use(json({ limit: '10mb' }));
app.use(urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// const ORIGINS =  process.env.ORIGINS || [
//     'https://celestial-charm.shop',
//     'https://www.celestial-charm.shop',
//     'http://localhost:5173',
// ];

// app.use(cors({
//     origin: (origin, cb) => cb(null, !origin || ORIGINS.includes(origin)),
//     credentials: true
// }));

const allowed = [
    "https://www.celestial-charm.shop",
    "https://celestial-charm.shop",
    ];
app.use(
    cors({
        origin(origin, cb) {
            if (!origin) return cb(null, true);
            if (allowed.includes(origin)) return cb(null, true);
            cb(null, false);
        },
        credentials: true,
    })
);



app.get('/api/health', (req, res) => {
    res.status(200).json({ ok: true, uptime: process.uptime() });
});

app.get('/api/dbcheck', async (_req, res) => {
    try { await connection.db.admin().ping(); res.json({ db: 'ok' }); }
    catch (e) { res.status(500).json({ db: 'down', message: e.message }); }
});

import forgotPasswordRoute from './routes/forgot-password.js';
import quizRoutes from './routes/quizRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import authRouter from './routes/auth.js';
import productItemsRoutes from './routes/productItemsRoutes.js';
import usersRoutes from './routes/users.js';
import productsRoutes from './routes/productsRoutes.js';
import forgotUsernameRoute from './routes/forgot-username.js';
import { requireAuth } from './middleware/requireAuth.js';

app.use('/api/auth', authRouter);
app.use('/api', productItemsRoutes);
app.use('/api/users', requireAuth, usersRoutes);
app.use('/api', productsRoutes);
app.use('/api/forgot-username', forgotUsernameRoute);
app.use('/api/forgot-password', forgotPasswordRoute);
app.use('/api/quiz', requireAuth, quizRoutes);
app.use('/api/store', requireAuth, storeRoutes);

app.use((err, req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: err?.message || 'Server error' });
});

async function start() {
    await connect(process.env.MONGODB_URI || 'mongodb+srv://ahezekiah:RedLights@celestial-charm.jmhlund.mongodb.net/', {
        dbName: 'authentication' // guarantees it lands in “authentication”
    });
    app.listen(process.env.PORT || 10000, () =>
        console.log(`Server up on :${process.env.PORT || 10000}`)
    );
}
start();

export default app;