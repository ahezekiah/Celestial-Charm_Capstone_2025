import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
const COOKIE_NAME = 'cc_session';

function cookieOptions(res, token) {
    res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: true,             // Render runs HTTPS
        sameSite: 'none',         // required for cross-site (Vercel → Render)
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        // If your site is on www.celestial-charm.shop:
        domain: '.celestial-charm.shop'
    });
}

function sign(user) {
    return jwt.sign(
        { sub: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}



/** POST /api/auth/register */
export async function register(req, res) {
    try {
        console.log("Incoming register request body:", req.body);
        const { name, username, email, password, birthday, phoneNumber, profilePicture  } = req.body || {};
        if (!name || !username || !email || !password || !birthday || !phoneNumber ) {
            return res.status(400).json({ error: 'Problem registering user', message: 'Missing fields' });
        }

        const exists = await User.findOne({ $or: [{ email }, { username }] }).lean();
        if (exists) return res.status(409).json({ message: 'Email or username already in use' });

        const hash = await bcrypt.hash(password, 12);
        const user = await User.create({ 
            name,
            username,
            email,
            password: hash, // ✅ safely stored
            birthday,
            phoneNumber,
            profilePicture: profilePicture || null 
        });
        console.log("🔒 Hashed password", password);

        const token = sign(user);
        cookieOptions(res, token);

        return res.status(201).json({ message: 'User registered',
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
    } catch (e) {
        console.error('[auth/register] error:', e);
        return res.status(500).json({ error: err.message, message: 'Registration failed'  });
    }
};

export async function login(req, res) {
    try {
        const { emailOrUsername, password } = req.body || {};
        if (!emailOrUsername || !password) {
            return res.status(400).json({ message: 'Missing credentials' });
        }

        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
        }).select('+password');

        if (!user || !user.password) return res.status(401).json({ message: 'Invalid credentials' });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

        const token = sign(user);
        cookieOptions(res, token);

        return res.json({
            user: { id: String(user._id), email: user.email, username: user.username }
        });
    } catch (e) {
        console.error('[auth/login] error:', e);
        return res.status(500).json({ message: 'Login failed' });
    }
};

// export async function me(req, res) {
//     return res.json({ user: req.user });
// };

export async function me (req, res) {
    try {
        const user = await User.findById(req.auth.userId).lean();
        if (!user) return res.status(401).json({ message: 'Unauthorized' });
        res.json({ user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        console.error('[auth/me] error:', err);
        res.status(500).json({ message: 'Failed to load user' });
    }
};

export async function logout(req, res) {
    res.clearCookie(COOKIE_NAME, {
        path: '/',
        domain: '.celestial-charm.shop',
        sameSite: 'none',
        secure: true,
        httpOnly: true
    });
    return res.json({ ok: true });
};

