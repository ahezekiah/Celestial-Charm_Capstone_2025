// AuthProvider.jsx
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { api, getMe } from '../api/http.js'; // your helper that sets credentials: 'include'

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    (async () => {
        try {
            const u = await getMe();  // returns null on 401, no throw
            setUser(u);
        } finally {
            setLoading(false);
        }
        })();
    }, []);

    const value = useMemo(() => ({
    user,
    login: async (emailOrUsername, password) => {
        await api('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ emailOrUsername, password }),
        });
        setUser(await getMe());
    },
    register: async ({ name, username, email, password }) => {
        await api('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, username, email, password }),
        });
        setUser(await getMe());
    },
    logout: async () => {
        await api('/auth/logout', { method: 'POST' }).catch(() => {});
        setUser(null);
    },
    }), [user]);

  if (loading) return null; // or a spinner

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
        (async () => { await refreshMe(); })();
    }, []);

// async function login(creds) {
//     const res = await api('/auth/login', { method: 'POST', body: JSON.stringify(creds) });
//     if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || 'Login failed');
//     await refreshMe();
// }

// async function register(form) {
//     const res = await api('/auth/register', { method: 'POST', body: JSON.stringify(form) });
//     if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || 'Registration failed');
//     await refreshMe();
// }

// async function logout() {
//     await api('/auth/logout', { method: 'POST' }).catch(() => {});
//     setUser(null);
// }

    return (
        <AuthCtx.Provider value={{ value, refreshMe }}>
            {children}
        </AuthCtx.Provider>
    );
};
