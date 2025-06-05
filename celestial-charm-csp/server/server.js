const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

mongoose.connect(process.env.MONGODB_URI, )
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));
mongoose.connection.once('open', () => {
    console.log("MongoDB connection established");
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/users'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
