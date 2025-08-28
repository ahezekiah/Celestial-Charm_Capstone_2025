// context/AuthProvider.jsx (JS/JSX)
import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/http';

const Ctx = createContext({ user:null, loading:true, refresh:async()=>{}, logout:async()=>{} });

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function refresh() {
        try {
            const { user } = await api('/auth/me');   // credentials included
            setUser(user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
        try { await api('/auth/logout', { method:'POST' }); } catch {}
        setUser(null);
    }

    useEffect(() => { refresh(); }, []);

    return <Ctx.Provider value={{ user, loading, refresh, logout }}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);
