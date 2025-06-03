const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        console.log("Incoming register request body:", req.body);
        const { name, username, email, password, birthday, phoneNumber } = req.body;
        if (!name || !username || !email || !password || !birthday || !phoneNumber) {
            return res.status(400).json({ error: 'Problem registering user' });
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, username, email, password: hashed, birthday, phoneNumber });
        await user.save();

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ message: 'User registered',
            token,
            name: user.name,
            username: user.username,
            email: user.email,
            birthday: user.birthday,
            phone: user.phoneNumber
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;
        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, username: user.username, email: user.email, birthday: user.birthday, phone: user.phone });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { register, login };
