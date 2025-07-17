import Footer from "../../components/Footer/Footer";
import NavBar1 from "../../components/NavBars/Navbar1";
import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
    const [message, setMessage] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/forgot-password', { 
                identifier, 
                phoneNumber, 
                newPassword 
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };
    return (
        <>
        <NavBar1 />
        
        <Footer />
        </>
    );
};