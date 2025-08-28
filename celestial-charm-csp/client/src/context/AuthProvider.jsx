import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/http';

const AuthCtx = createContext({ user: null, refresh: async () => {}, logout: async () => {} });

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    async function refresh() {
        try { const { user } = await api('/auth/me'); setUser(user); }
        catch { setUser(null); }
    }
    async function logout() { await api('/auth/logout', { method: 'POST' }).catch(()=>{}); setUser(null); }

    useEffect(() => { refresh(); }, []);

    return <AuthCtx.Provider value={{ user, refresh, logout }}>{children}</AuthCtx.Provider>;
}
export const useAuth = () => useContext(AuthCtx);
