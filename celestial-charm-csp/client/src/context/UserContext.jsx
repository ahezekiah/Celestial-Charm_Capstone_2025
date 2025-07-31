import { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                if (parsed && parsed._id) {
                    setUser(parsed);
                    setLoading(false);
                    return;
                }
            } catch {
                console.error("Stored user invalid or missing _id:", parsed);
                localStorage.removeItem('user');
            }
        }

        if (token) {
            fetch('/api/auth/me', {
                headers: { Authorization: `Bearer ${token}`,},
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.user) {
                    setUser(data.user);
                    localStorage.setItem('user', JSON.stringify(data.user));
                } else {
                    logout();
                }
            })
            .catch(() => logout())
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const refreshUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const res = await axios.get('/api/profile', {
                    headers: { Authorization: `Bearer ${token}`},
                });
                setUser(res.data);
            } catch (error) {
                console.log('Error refreshing user:', error);
            }
        };

        useEffect(() => {
            refreshUser().finally(() => setLoading(false));
        }, []);



    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // Clear token on logout
    };

    const updateUserContext = (updatedData) => {
        setUser(updatedData);
        localStorage.setItem('user', JSON.stringify(updatedData));
    };

    const isLoggedIn = !!user;

    return (
        <UserContext.Provider value={{ user, login, logout, isLoggedIn, updateUserContext, refreshUser }}>
            {!loading && children}
        </UserContext.Provider>
    );
};
