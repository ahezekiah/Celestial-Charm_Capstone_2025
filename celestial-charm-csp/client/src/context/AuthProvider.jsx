// AuthProvider.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/http.js'; // your helper that sets credentials: 'include'

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     (async () => {
    //     try {
    //         const { user } = await api('/auth/me');   // { user: { id, email, username } }
    //         setUser(user);
    //     } catch {
    //         setUser(null);
    //     } finally {
    //         setLoading(false);
    //     }
    //     })();
    // }, []);


    // in your AuthProvider or top-level layout effect
    useEffect(() => {
    let cancelled = false;
    api("/auth/me")
        .then(({ user }) => { if (!cancelled) setUser(user); })
        .catch(() => { if (!cancelled) setUser(null); })
        .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
    }, []);

    const value = { user, setUser, loading };
    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};
