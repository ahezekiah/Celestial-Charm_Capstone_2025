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

const ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://celestial-charm.vercel.app",
];

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || ORIGINS.includes(origin)) {
                return callback(null, true);
            }

            return callback(
                new Error(`Not allowed by CORS: ${origin}`)
            );
        },
        credentials: true,
    })
);

import forgotPasswordRoute from './routes/forgot-password.js';
import quizRoutes from './routes/quizRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import authRouter from './routes/auth.js';
import productItemsRoutes from './routes/productItemsRoutes.js';
import usersRoutes from './routes/users.js';
import productsRoutes from './routes/productsRoutes.js';
import forgotUsernameRoute from './routes/forgot-username.js';
import { requireAuth } from './middleware/requireAuth.js';
import reviewRoutes from './routes/reviewRoutes.js';

app.use('/api/auth', authRouter);
app.use('/api', productItemsRoutes);
app.use('/api/users', requireAuth, usersRoutes);
app.use('/api', productsRoutes);
app.use('/api/forgot-username', forgotUsernameRoute);
app.use('/api/forgot-password', forgotPasswordRoute);
app.use('/api/quiz', requireAuth, quizRoutes);
app.use('/api/store', requireAuth, storeRoutes);
app.use('/api/reviews', reviewRoutes);

async function start() {
    await connect(process.env.MONGODB_URI, {
        dbName: 'authentication' // guarantees it lands in “authentication”
    });
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server up on port ${PORT}`);
    });
}
start();

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Celestial Charm API is running",
        status: "online",
        health: "/api/health",
    });
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ ok: true, uptime: process.uptime() });
});

app.get('/api/dbcheck', async (_req, res) => {
    try { await connection.db.admin().ping(); res.json({ db: 'ok' }); }
    catch (e) { res.status(500).json({ db: 'down', message: e.message }); }
});

// 404
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// error handler LAST
app.use((err, req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: err?.message || 'Server error' });
});



export default app;