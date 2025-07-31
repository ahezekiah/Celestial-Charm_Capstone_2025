import { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    // useEffect(() => {
    //     const storedUser = localStorage.getItem('user');
    //     const token = localStorage.getItem('token');

    //     if (storedUser) {
    //         try {
    //             const parsed = JSON.parse(storedUser);
    //             if (parsed && parsed._id) {
    //                 setUser(parsed);
    //                 setLoading(false);
    //                 return;
    //             }
    //         } catch {
    //             console.error("Stored user invalid or missing _id:", parsed);
    //             localStorage.removeItem('user');
    //         }
    //     }

    //     if (token) {
    //         fetch('/api/auth/me', {
    //             headers: { Authorization: `Bearer ${token}`,},
    //         })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             if (data.user) {
    //                 setUser(data.user);
    //                 localStorage.setItem('user', JSON.stringify(data.user));
    //             } else {
    //                 logout();
    //             }
    //         })
    //         .catch(() => logout())
    //         .finally(() => setLoading(false));
    //     } else {
    //         setLoading(false);
    //     }
    // }, []);

    const refreshUser = async () => {
            // const res = await fetch('/api/auth/me', {
            //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
            // });
            // const data = await res.json();
            // setUser(data);
        if (!token) return;
        try {
            const res = await fetch('/api/auth/me', {
                headers: { Authorization: `Bearer ${token}`},
            });
            const data = await res.json();
            if(data.user) {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
            } else {
                logout();
            }
        } catch (error) {
            console.error('Refresh error:', error);
            logout();
        }
            
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if(storedUser){
            try {
                const parsed = JSON.parse(storedUser);
                if (parsed && parsed._id) {
                    setUser(parsed);
                }
            } catch (error) {
                console.warn('Invalid stored user, clearing...');
                localStorage.removeItem('user');
            }
        }
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
