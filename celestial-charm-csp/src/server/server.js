const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const e = require('express');
// const auth = require('./routes/auth');
const router = express.Router();

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.error("MongoDB error:", err.message));



// app.use('/api/auth', auth);
module.exports = router;