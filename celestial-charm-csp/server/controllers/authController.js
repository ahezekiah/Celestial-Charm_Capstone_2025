const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { name, username, phoneNumber, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, username, phoneNumber, email, password: hashed });
    await user.save();
    res.status(201).json({ message: 'User registered' });
};

const login = async (req, res) => {
    const { emailOrUsername, password } = req.body;
    const user = await User.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, username: user.username });
};

module.exports = { register, login };
