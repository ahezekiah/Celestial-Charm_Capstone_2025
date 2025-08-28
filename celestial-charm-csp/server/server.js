const express = require('express');
const cors = require('cors');
const app = express();
const forgotPasswordRoute = require('./routes/forgot-password');
const quizRoutes = require('./routes/quizRoutes');
const storeRoutes = require('./routes/storeRoutes');
const authRouter = require('./routes/auth');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();



// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// const allowed = (process.env.FRONTEND_ORIGIN || '').split(',').filter(Boolean);
// // app.use(cors({
//     origin: (origin, cb) => {
//         if (!origin || allowed.includes(origin) || origin === 'http://localhost:5173') return cb(null, true);
//         cb(new Error('Not allowed by CORS'));
//     },
//     credentials: true
// }));

const ORIGINS = (process.env.FRONTEND_ORIGIN || 'https://celestial-charm.shop, https://www.celestial-charm.shop')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
// e.g. FRONTEND_ORIGIN="https://celestial-charm.shop, https://www.celestial-charm.shop"

app.use(cors({
    origin: (origin, cb) => {
        if (!origin) return cb(null, true);
        if (ORIGINS.includes(origin)) return cb(null, true);
        return cb(new Error('CORS blocked'));
    },
    credentials: true
}));

app.get(['/api/health', '/health'], (_req, res) => res.json({ ok: true }));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.set('trust proxy', 1);
app.use(cookieParser());

// mongoose.connect(process.env.MONGODB_URI, )
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.error("MongoDB connection error:", err));


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

app.get("/api/dbcheck", async (_req, res) => {
    try { await mongoose.connection.db.admin().ping(); res.json({ db: "ok" }); }
    catch (e) { res.status(500).json({ db: "down", message: e.message }); }
});


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

app.use((err, req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: err?.message || 'Server error' });
});




app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
