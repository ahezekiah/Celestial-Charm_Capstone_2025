import express from 'express';
import connectDB from './config/db';
import cors from 'cors';
import authRoutes from './routes/auth';
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

connectDB();
// mongoose.connect('mongodb+srv://ahezekiah:RedLights@celestial-charm.jmhlund.mongodb.net/')
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});