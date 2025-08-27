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

app.set('trust proxy', 1);

// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
const allowed = (process.env.FRONTEND_ORIGIN || '').split(',').filter(Boolean);
app.use(cors({
    origin: (origin, cb) => {
        if (!origin || allowed.includes(origin) || origin === 'http://localhost:5173') return cb(null, true);
        cb(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

const ORIGINS = (process.env.FRONTEND_ORIGIN || '')
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
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI, )
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));
// mongoose.connection.once('open', () => {
//     console.log("MongoDB connection established");
// });

// secondDb.js
module.exports = mongoose.createConnection(process.env.SECOND_MONGODB_URI);

// thirdDb.js
const conn = mongoose.createConnection(process.env.THIRD_MONGODB_URI);
conn.on('error', console.error.bind(console, 'Mongo error:'));
conn.once('open', () => console.log('Third Mongo connected'));
module.exports = conn;


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

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
