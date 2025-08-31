// AuthProvider.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/http.js'; // your helper that sets credentials: 'include'

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // in your AuthProvider or top-level layout effect
    useEffect(() => {
    let cancelled = false;
    api("/auth/me")
        .then(({ user }) => { if (!cancelled) setUser(user); })
        .catch(() => { if (!cancelled) setUser(null); })
        .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
    }, []);

async function refreshMe() {
    try {
        const res = await fetch('/api/auth/me', { credentials: 'include' }); 
        if (!res.ok) throw new Error();
        const { user } = await res.json();
        setUser(user);
    } catch {
        setUser(null);
    } finally {
        setLoading(false);
    }
}

useEffect(() => { refreshMe(); }, []);

async function login(emailOrUsername, password) {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',               
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername, password }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Login failed');
    }

  // cookie now set by server → get the user
    await refreshMe();                       
}

async function register(form) {
    // form: { name, username, email, password, ... }
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        credentials: 'include',                 // ← important
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername: form.email || form.username, password: form.password }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Registration failed');
    }

    // Some APIs return { user } on register; others only set cookie.
    // Handle both.
    let data = null;
    try { data = await res.json(); } catch (e) { /* no body */ }

    if (data?.user) {
        setUser(data.user);
    } else {
        await refreshMe();                      // use the cookie to fetch user
    }
}

    const value = { user, setUser, loading, login, refreshMe, register  };
    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};
