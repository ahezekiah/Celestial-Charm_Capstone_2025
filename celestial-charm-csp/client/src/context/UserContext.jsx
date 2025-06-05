import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            if (parsed && parsed._id) {
                setUser(parsed);
            } else {
                console.error("Stored user invalid or missing _id:", parsed);
                localStorage.removeItem('user');
            }
        }
    }, []);



    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            setUser(JSON.parse(stored));
        } else if (localStorage.getItem('token')) {
            fetch('/api/users/me', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(() => logout());
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // Clear token on logout
        setUser(null);
    };

    const isLoggedIn = !!user;

    const updateUserContext = (updatedData) => {
        setUser(updatedData);
        localStorage.setItem('user', JSON.stringify(updatedData));
    };


    return (
        <UserContext.Provider value={{ user, login, logout, isLoggedIn: !!user, updateUserContext, loading }}>
            {children}
        </UserContext.Provider>
    );
};
