import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("loading"); // 'loading' | 'guest' | 'authed'

    // hydrate on boot
    useEffect(() => {
        let mounted = true;
        (async () => {
        try {
            const { user } = await api("/api/auth/me"); // full user
            if (mounted) {
            setUser(user);
            setStatus("authed");
            }
        } catch {
            if (mounted) {
            setUser(null);
            setStatus("guest");
            }
        }
        })();
        return () => (mounted = false);
    }, []);

    const login = async ({ emailOrUsername, password }) => {
        const { user } = await api("/api/auth/login", {
        method: "POST",
        body: { emailOrUsername, password },
        });
        setUser(user);
        setStatus("authed");
        return user;
    };

    const register = async ({ name, email, username, password, phoneNumber, birthday, profilePicture }) => {
        const { user } = await api("/api/auth/register", {
        method: "POST",
        body: { 
            name: name || undefined, 
            email, 
            username, 
            password, 
            phoneNumber: phoneNumber || undefined, 
            birthday: birthday || undefined,
            profilePicture: profilePicture || undefined
        },
    });
        setUser(user);
        setStatus("authed");
        return user;
    };

    const logout = async () => {
        try {
        await api("/api/auth/logout", { method: "POST" });
        } finally {
        setUser(null);
        setStatus("guest");
        }
    };

    const value = useMemo(() => ({ user, status, login, register, logout }), [user, status]);

    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

