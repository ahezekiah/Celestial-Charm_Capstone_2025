// AuthProvider.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/http.js'; // your helper that sets credentials: 'include'

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // in your AuthProvider or top-level layout effect
    // useEffect(() => {
    // let cancelled = false;
    // api("/auth/me")
    //     .then(({ user }) => { if (!cancelled) setUser(user); })
    //     .catch(() => { if (!cancelled) setUser(null); })
    //     .finally(() => { if (!cancelled) setLoading(false); });
    // return () => { cancelled = true; };
    // }, []);

async function refreshMe() {
    const res = await api('/auth/me');
    if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        } else if (res.status === 401) {
        setUser(null); // not logged in – normal, don’t treat as error
        }
    }

    useEffect(() => {
        (async () => { await refreshMe(); setLoading(false); })();
    }, []);

async function login(creds) {
    const res = await api('/auth/login', { method: 'POST', body: JSON.stringify(creds) });
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || 'Login failed');
    await refreshMe();
}

async function register(form) {
    const res = await api('/auth/register', { method: 'POST', body: JSON.stringify(form) });
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || 'Registration failed');
    await refreshMe();
}

async function logout() {
    await api('/auth/logout', { method: 'POST' }).catch(() => {});
    setUser(null);
}

    return (
        <AuthCtx.Provider value={{ user, loading, login, register, logout, refreshMe }}>
            {children}
        </AuthCtx.Provider>
    );
};
