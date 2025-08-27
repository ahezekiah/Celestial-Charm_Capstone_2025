const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    try {
        console.log("Incoming register request body:", req.body);
        const { name, username, email, password, birthday, phoneNumber, profilePicture  } = req.body;
        if (!name || !username || !email || !password || !birthday || !phoneNumber ) {
            return res.status(400).json({ error: 'Problem registering user' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            username,
            email,
            password: hashedPassword, // ✅ safely stored
            birthday,
            phoneNumber,
            profilePicture: profilePicture || null
        });
        console.log("🔒 Hashed password", password);
        await user.save();

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ message: 'User registered',
            token,
            user: {
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    birthday: user.birthday,
                    phoneNumber: user.phoneNumber,
                    profilePicture: user.profilePicture || null,
                    personalityType: user.personalityType || null,
            }
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res, next) => {
    try {
        const { emailOrUsername, password } = req.body || {};
        console.log("🔍 Incoming login:", emailOrUsername, password);
        if (!emailOrUsername || !password) {
            return res.status(400).json({ message: "emailOrUsername and password required" });
        }

        const user = await User.findOne({
            $or: [{ username: emailOrUsername }, { email: emailOrUsername }]
        }).select("+password");

        if (!user) {
            console.log("❌ No matching user found.");
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        console.log("✅ Found user:", user.username);

        const hash = user.password ?? user.password; // support either field name
        if (!hash) return res.status(500).json({ message: "User has no password hash" });    


        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("🔐 Password valid?", isPasswordValid);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT_SECRET not set" });
        }

        const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        // res.json({
        //         token,
        //         user: {
        //             _id: user._id,
        //             name: user.name,
        //             username: user.username,
        //             email: user.email,
        //             birthday: user.birthday,
        //             phoneNumber: user.phoneNumber,
        //             profilePicture: user.profilePicture || null,
        //             personalityType: user.personalityType || null,
        //         }
        //     });
            
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: "/"
            });
            
            res.json({
                user: { id: user._id, username: user.username, email: user.email }
            });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: err.message });
    }
};


module.exports = { register, login };
