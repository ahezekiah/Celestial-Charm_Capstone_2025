import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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

const COOKIE_NAME = process.env.COOKIE_NAME || 'cc_session';
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || '.celestial-charm.shop';

const isProd = "production";
const cookieOptions = {
    // httpOnly: true,
    // secure: isProd,               // true in prod
    // sameSite: isProd ? "None" : "Lax",
    // domain: isProd ? COOKIE_DOMAIN : undefined,
    // path: "/",
    // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days

    httpOnly: true,
    sameSite: 'none',
    secure: true,
    domain: COOKIE_DOMAIN || '.celestial-charm.shop', // note the dot
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

// const cookieOptions = {
//     httpOnly: true,
//     secure: true,
//     sameSite: "none",
//     domain: COOKIE_DOMAIN,
//     path: "/",
//     maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
// };
const JWT_SECRET = process.env.JWT_SECRET || 'AteezPresent' ;

function sign(userId) {
    return jwt.sign(
        { sub: userId },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
}

function readToken(req) {
    const t = req.cookies?.cc_session;
        if (!t) return null;
    try {
        return jwt.verify(t, JWT_SECRET);
    } catch {
        return null;
    }
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

        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ 
            name,
            username,
            email: email.toLowerCase(),
            password: hash,

        });
        console.log("🔒 Hashed password", password);

        const token = sign(user.id);
        res.cookie(COOKIE_NAME, token, cookieOptions);

        return res.status(201).json({ message: 'User registered',
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                password: user.password
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
            $or: [{ email: emailOrUsername.toLowerCase() }, { username: emailOrUsername }]
        }).select('+password');

        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

        const token = sign(user.id);
        res.cookie(COOKIE_NAME, token, cookieOptions);

        return res.status(201).json({
            user: { id: user.id, email: user.email, username: user.username }
        });
    } catch (e) {
        console.error('[auth/login] error:', e);
        return res.status(500).json({ message: 'Login failed' });
    }
};



export async function me (req, res) {
    try {

        const payload = readToken(req);
        if (!payload?.sub) return res.status(401).json({ message: "Unauthorized" });

        const user = await User.findById(payload.sub).lean();
        if (!user) return res.status(401).json({ message: "Unauthorized" });

        res.json({
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
            // gems: user.gems ?? 0,
            // personalityType: user.personalityType ?? null,
            // profilePicture: user.profilePicture ?? null,
            // birthday: user.birthday ?? null,
            // phoneNumber: user.phoneNumber ?? null,
            // inventory: Array.isArray(user.inventory) ? user.inventory : []
        }
        });
    } catch (err) {
        console.error('[auth/me] error:', err);
        res.status(500).json({ message: 'Failed to load user' });
    }
};

export async function logout(_req, res) {
    res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: 0 });
    res.json({ ok: true });
};

