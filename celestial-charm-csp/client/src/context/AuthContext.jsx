// AuthProvider.jsx
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { api } from '../lib/api.js'; // your helper that sets credentials: 'include'

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const { user } = await api('/auth/me');   // will 401 if not logged in
                if (mounted) setUser(user);
            } catch {
                // not logged in – ignore
            } finally {
                if (mounted) setReady(true);
            }
        })();
        return () => { mounted = false; };
    }, []);

    const login = async (emailOrUsername, password) => {
        await api('/auth/login', { method: 'POST', body: { emailOrUsername, password } });
        const { user } = await api('/auth/me');
        setUser(user);
    };

    const logout = async () => {
        try { await api('/auth/logout', { method: 'POST' }); } catch {}
        setUser(null);
    };

    const value = useMemo(
        () => ({ user, setUser, login, logout }),
        [user]
    );

    if (!ready) return null;
    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthCtx);
    if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
    return ctx;
}

