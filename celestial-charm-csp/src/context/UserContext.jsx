import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [firebaseUser] = useAuthState(auth);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (firebaseUser){
                const res = await axios.get(`http://localhost:5000/api/auth/user/${firebaseUser.uid}`);
                setUserInfo(res.data);
            }
        };
        fetchUser();
    }, [firebaseUser]);
    return (
        <UserContext.Provider value={{ userInfo }}>
            {children}
        </UserContext.Provider>
    );
};
