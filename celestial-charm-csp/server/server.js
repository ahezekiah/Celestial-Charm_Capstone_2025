const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();


app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

mongoose.connect(process.env.MONGODB_URI, )
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));
mongoose.connection.once('open', () => {
    console.log("MongoDB connection established");
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/productItemsRoutes'));
app.use('/api/users', require('./routes/users'));
app.use('/api', require('./routes/productsRoutes'));
// app.use('/api/products', require('./routes/productsRoutes'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
