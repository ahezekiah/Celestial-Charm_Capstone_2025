// AuthProvider.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/http.js'; // your helper that sets credentials: 'include'

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
        try {
            const { user } = await api('/auth/me');   // { user: { id, email, username } }
            setUser(user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
        })();
    }, []);

    const value = { user, setUser, loading };
    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
