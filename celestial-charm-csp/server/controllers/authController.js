import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

// function cookieOptions(req, res, token) {


//     const host =
//         req.headers['x-forwarded-host'] || req.headers.host || ''; // works behind Render/CF

//         let domain; // omit domain by default
//         if (host.endsWith('.onrender.com')) {
//             domain = host; // lock to the render host you're on
//         } else if (host.endsWith('celestial-charm.shop')) {
//             domain = '.celestial-charm.shop'; // works for www + apex
//         }

//     res.cookie(COOKIE_NAME, token, {
//         httpOnly: true,
//         secure: true,
//         sameSite: 'none',
//         path: '/',
//         maxAge: 1000 * 60 * 60 * 24 * 7,
//         ...(domain ? { domain } : {})   // only set when we computed one
//     });
// }

const COOKIE_NAME = process.env.COOKIE_NAME;
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    domain: COOKIE_DOMAIN,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};
const JWT_SECRET = process.env.JWT_SECRET;

function sign(user) {
    return jwt.sign(
        { sub: user._id.toString() },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
}



/** POST /api/auth/register */
export async function register(req, res) {
    try {
        console.log("Incoming register request body:", req.body);
        const { name, username, email, password  } = req.body || {};
        if (!name || !username || !email || !password ) {
            return res.status(400).json({ error: 'Problem registering user', message: 'Missing fields' });
        }

        const exists = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] }).lean();
        if (exists) return res.status(409).json({ message: 'Email or username already in use' });

        const hash = await bcrypt.hash(password, 12);
        const user = await User.create({ 
            name,
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hash
        });
        console.log("🔒 Hashed password", password);

        const token = sign(user);
        res.cookie(COOKIE_NAME, token, cookieOptions);

        return res.status(201).json({ message: 'User registered',
            user: {
                _id: user._id,
                // name: user.name,
                username: user.username,
                email: user.email,
                // password: user.password
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
            $or: [{ email: emailOrUsername.toLowerCase() }, { username: emailOrUsername.toLowerCase() }]
        }).select('+password');

        if (!user || !user.password) return res.status(401).json({ message: 'Invalid credentials' });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

        const token = sign(user);
        res.cookie(COOKIE_NAME, token, cookieOptions);

        return res.status(201).json({
            user: { id: user._id, email: user.email, username: user.username }
        });
    } catch (e) {
        console.error('[auth/login] error:', e);
        return res.status(500).json({ message: 'Login failed' });
    }
};



export async function me (req, res) {
    try {
        const u = await User.findById(req.user.id)
        .select('_id username email name gems personalityType profilePicture birthday phoneNumber inventory')
        .lean();

        if (!u) return res.status(404).json({ message: 'Not found' });

        res.json({
        user: {
            id: u._id.toString(),
            username: u.username,
            email: u.email,
            name: u.name ?? '',
            gems: u.gems ?? 0,
            personalityType: u.personalityType ?? null,
            profilePicture: u.profilePicture ?? null,
            birthday: u.birthday ?? null,
            phoneNumber: u.phoneNumber ?? null,
            inventory: Array.isArray(u.inventory) ? u.inventory : []
        }
        });
    } catch (err) {
        console.error('[auth/me] error:', err);
        res.status(500).json({ message: 'Failed to load user' });
    }
};

export async function logout(req, res) {
    res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: 0 });
    res.json({ ok: true });
};

