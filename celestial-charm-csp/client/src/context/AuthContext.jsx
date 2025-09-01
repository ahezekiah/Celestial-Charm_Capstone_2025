import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
const emptyUser = Object.freeze({
    id: "",
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    birthday: "",
    profilePicture: "",
    gems: 0,
    personalityType: "",
    inventory: [],
});


const defaultAuth = {
    status: "idle",        // 'idle' | 'loading' | 'authenticated' | 'unauthenticated'
    user: emptyUser,
    login: async () => {},
    register: async () => {},
    logout: () => {},
    refresh: async () => {},
};

const AuthCtx = createContext(defaultAuth);


export function AuthProvider({ children }) {
    const [user, setUser] = useState(emptyUser);
    const [status, setStatus] = useState("loading"); // 'loading' | 'guest' | 'authed'


    useEffect(() => {
    (async () => {
        try {
            const data = await fetch("/api/auth/me"); // backend reads cookie
            setUser(data.user);
            setStatus("authenticated");
        } catch {
            setUser(null);
            setStatus("unauthenticated");
        }
        })();
    }, []);


    async function refresh() {
        try {
            const r = await fetch("/api/auth/me", { credentials: "include" });
            if (!r.ok) throw new Error("unauthorized");
            const data = await r.json();
            setUser({
                id: data.user.id || data.user._id || "",
                name: data.user.name || "",
                username: data.user.username || "",
                email: data.user.email || "",
                phoneNumber: data.user.phoneNumber || "",
                birthday: data.user.birthday || "",
                profilePicture: data.user.profilePicture || "",
                gems: data.user.gems ?? 0,
                personalityType: data.user.personalityType || "",
                inventory: data.user.inventory || [],
            });
            setStatus("authenticated");
        } catch {
            setUser(emptyUser);
            setStatus("unauthenticated");
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
        fetch("/api/auth/logout", { 
            method: "POST", 
            credentials: "include" 
        }).finally(() => {
            setUser(emptyUser);
            setStatus("unauthenticated");
        });
    }

    function updateUser(userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(updatedData));
    }

    const value = useMemo(() => ({ 
        user, 
        status, 
        login, 
        register, 
        logout, 
        refresh, 
        updateUser,
        isAuthenticated: status === "authenticated"
    }), [user, status]);

    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
