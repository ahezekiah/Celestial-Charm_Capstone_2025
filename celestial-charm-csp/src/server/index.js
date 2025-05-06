import express from 'express';
import connectDB from './config/db';
// import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth';

// dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});