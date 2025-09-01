import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

const defaultAuth = {
    status: "idle",        // 'idle' | 'loading' | 'authenticated' | 'unauthenticated'
    user: null,
    login: async () => {},
    register: async () => {},
    logout: () => {},
    refresh: async () => {},
};

const AuthCtx = createContext(defaultAuth);


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("loading"); // 'loading' | 'guest' | 'authed'

    // hydrate on boot
    // useEffect(() => {
    //     let mounted = true;
    //     (async () => {
    //     try {
    //         const { user } = await api("/api/auth/me"); // full user
    //         if (mounted) {
    //         setUser(user);
    //         setStatus("authed");
    //         }
    //     } catch {
    //         if (mounted) {
    //         setUser(null);
    //         setStatus("guest");
    //         }
    //     }
    //     })();
    //     return () => (mounted = false);
    // }, []);



    async function refresh() {
        try {
            const r = await fetch("/api/auth/me", { credentials: "include" });
            if (!r.ok) throw new Error("unauthorized");
            const data = await r.json();
            setUser(data.user);
            setStatus("Authenticated");
        } catch {
            setUser(null);
            setStatus("Unauthenticated");
        }
    }
    useEffect(() => { refresh(); }, []);

    async function login({ emailOrUsername, password }) {
    const r = await fetch("/api/auth/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ emailOrUsername, password }),
        });
        if (!r.ok) throw new Error((await r.json()).message || "Login failed");
        await refresh();
    }

    async function register(payload) {
        const payload = {
                name: form.name || undefined,
                username: form.username,
                email: form.email,
                password: form.password,
                phoneNumber: form.phoneNumber || undefined,
                birthday: form.birthday || undefined,        // "YYYY-MM-DD" from <input type="date" />
                profilePicture: form.profilePicture || undefined, // base64 data URL
            };

        const r = await fetch("/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
        if (!r.ok) throw new Error((await r.json()).message || "Register failed");
        await refresh();
    };

    function logout() {
        fetch("/api/auth/logout", { method: "POST", credentials: "include" }).finally(() => {
            setUser(null);
            setStatus("unauthenticated");
        });
    }

    const value = useMemo(() => ({ user, status, login, register, logout, refresh }), [user, status]);

    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
