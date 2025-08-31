// AuthProvider.jsx
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { api } from '../lib/api'; // your helper that sets credentials: 'include'

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    // useEffect(() => {
    //     api('/auth/me')
    //     .then(({ user }) => setUser(user))
    //     .catch(() => setUser(null))
    //     .finally(() => setReady(true));
    // }, []);

    useEffect(() => {
    let alive = true;
    (async () => {
      // ⬇️ dynamic import prevents a top-level circular import crash
        const { api } = await import('../lib/api');
        try {
            const { user } = await api('/auth/me');
            if (alive) setUser(user);
        } catch (_) {
            /* 401 when logged out is fine */
        } finally {
            if (alive) setReady(true);
        }
        })();
            return () => { alive = false; };
    }, []);

    const login = async (emailOrUsername, password) => {
        await api('/auth/login', { method: 'POST', body: { emailOrUsername, password } });
        const { user } = await api('/auth/me');
        setUser(user);
    };

    const register = async (payload) => {
        await api('/auth/register', { method: 'POST', body: payload });
        const { user } = await api('/auth/me');
        setUser(user);
    };

    const logout = async () => {
        await api('/auth/logout', { method: 'POST' });
        setUser(null);
    };

    return (
        <AuthCtx.Provider value={{ user, ready, setUser, login, register, logout }}>
        {children}
        </AuthCtx.Provider>
    );
}

export const useAuth = () => useContext(AuthCtx);

