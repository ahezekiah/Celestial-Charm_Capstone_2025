const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
// const router = express.Router();

const app = express();
const PORT = 5000;
// dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

mongoose.connect('mongodb+srv://ahezekiah:RedLights@celestial-charm.jmhlund.mongodb.net/authentication', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log('MongoDB is connected'))
//     .catch(err => console.error("MongoDB error:", err.message));



// app.use('/api/auth', auth);
// module.exports = router;