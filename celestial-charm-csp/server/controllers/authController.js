import User from '../models/User.js';
import psd from 'bcryptjs';
const { genSalt, hash, compare } = psd;
import pkg from 'jsonwebtoken';
const { sign } = pkg;

export async function register(req, res) {
    try {
        console.log("Incoming register request body:", req.body);
        const { name, username, email, password, birthday, phoneNumber, profilePicture  } = req.body;
        if (!name || !username || !email || !password || !birthday || !phoneNumber ) {
            return res.status(400).json({ error: 'Problem registering user' });
        }
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

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

        const token = sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
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

export async function login(req, res, next) {
    // try {
    //     const b = req.body || {};
    //     // normalize inputs
    //     const emailOrUsername = b.emailOrUsername ?? b.email ?? b.username;
    //     const password = b.password;
    //     if (!emailOrUsername || !password) {
    //     return res.status(400).json({ message: 'emailOrUsername and password required' });
    //     }

    //     // find user by email OR username; include password field even if select:false
    //     const user = await User.findOne({
    //     $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    //     }).select('+password +passwordHash');

    //     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    //     const hash = user.password ?? user.password;
    //     if (!hash) return res.status(500).json({ message: 'User has no password hash' });

    //     const ok = await bcrypt.compare(password, hash);
    //     if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    //     if (!process.env.JWT_SECRET) {
    //     return res.status(500).json({ message: 'JWT_SECRET not set' });
    //     }

    //     const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    //     res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none', path: '/' });

    //     res.json({ user: { id: user._id, username: user.username, email: user.email } });
    // } catch (err) {
    //     next(err);
    // }

    try {
        const b = req.body || {};
        const emailOrUsername = b.emailOrUsername ?? b.email ?? b.username;
        const password = b.password;
        if (!emailOrUsername || !password)
            return res.status(400).json({ message: 'emailOrUsername and password required' });

        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
        }).select('+password +passwordHash');

        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const hash = user.passwordHash ?? user.password;
        if (!hash) return res.status(500).json({ message: 'User has no password hash' });

        let ok = false;
        try { 
            ok = await compare(password, hash); 
        } catch { 
            return res.status(500).json({ message: 'Stored password is not a valid bcrypt hash' }); 
        }

        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

        if (!process.env.JWT_SECRET)
            return res.status(500).json({ message: 'JWT_SECRET not set' });

        const token = sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/dashboard'
        });

        res.json({ user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) { 
        next(err); 
    }
};


// export default { register, login };
