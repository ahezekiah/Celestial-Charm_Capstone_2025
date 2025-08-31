// AuthProvider.jsx
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { api, getMe } from '../lib/api.js'; // your helper that sets credentials: 'include'

const AuthCtx = createContext(null);

export function AuthContext({ children }) {
    const [user, setUser] = useState(null);
//     const [ready, setReady] = useState(false);

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

    const value = useMemo(() => ({ user, setUser }), [user]);

    // NOTE: hooks are above this early return, so no “hooks order” error (#310)
    if (!ready) return null;

    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthCtx);
    if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
    return ctx;
}

