import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const COOKIE_NAME = process.env.COOKIE_NAME || 'cc_session';
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || '.celestial-charm.shop';
const JWT_SECRET = process.env.JWT_SECRET || 'AteezPresent';


function setSessionCookie(res, userId) {
    const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "7d" });
    // SameSite=None + Secure for cross-site cookies (Vercel ↔ Render)
    res.cookie(COOKIE_NAME, token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: COOKIE_DOMAIN, // keep if your front is on this domain; remove on localhost
        path: "/",
    });
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
export async function register(req, res, next) {
    try {
        const {
            name = "",
            email,
            username,
            password,
            phoneNumber = "",
            birthday = "",           // e.g. "1999-10-10"
            profilePicture = "",     // dataURL or https URL
        } = req.body || {};

        if (!email || !username || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }

        // (tiny sanity checks; keep simple)
        if (birthday && !/^\d{4}-\d{2}-\d{2}$/.test(birthday)) {
            return res.status(400).json({ message: "Birthday must be YYYY-MM-DD" });
        }
        

        const existing = await User.findOne({ $or: [{ email }, { username }] }).lean();
        if (existing) return res.status(409).json({ message: "User already exists" });

        const hash = await bcrypt.hash(password, 10);
        const created = await User.create({
            name,
            email,
            username,
            password: hash,
            phoneNumber,
            birthday,
            profilePicture,
        });

        setSessionCookie(res, created._id.toString());

        const user = await User.findById(created._id)
            .select("name username email phoneNumber birthday profilePicture gems personalityType inventory");

        res.status(201).json({ user });
    } catch (err) {
        next(err);
    }
};

export async function login(req, res, next) {
    try {
        const { emailOrUsername, password } = req.body || {};
        if (!emailOrUsername || !password) {
            return res.status(400).json({ message: "Missing credentials" });
        }
        const userDoc = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
        }).select("+password");

        if (!userDoc) return res.status(401).json({ message: "Invalid credentials" });

        const ok = await userDoc.comparePassword(password);
        if (!ok) return res.status(401).json({ message: "Invalid credentials" });

        setSessionCookie(res, userDoc._id.toString());

        const user = await User.findById(userDoc._id)
            .select("name username email phoneNumber birthday profilePicture gems personalityType inventory");

        res.json({ user });
    } catch (err) {
        next(err);
    }
};



export async function me (req, res, next) {
    try {
        const user = await User.findById(req.user.sub)
        .select("name username email phoneNumber birthday profilePicture gems personalityType inventory");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ user });
    } catch (err) {
        next(err);
    }
};

export async function logout(req, res) {
    res.clearCookie(COOKIE_NAME, {
        sameSite: "none",
        secure: true,
        domain: COOKIE_DOMAIN,
        path: "/",
    });
    res.json({ ok: true });
};

