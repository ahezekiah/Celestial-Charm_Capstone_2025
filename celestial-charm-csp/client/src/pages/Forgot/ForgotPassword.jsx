import Footer from "../../components/Footer/Footer";
import NavBar1 from "../../components/NavBars/Navbar1";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { set } from "mongoose";

export default function ForgotPassword() {
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const [verified, setVerified] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/forgot-password/verify', { identifier });
            if (response.data.exists) {
                setVerified(true);
                setMessage(response.data.message);
            } else {
                setMessage("Account not found");
                setVerified(false);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "An has error occurred. Please try again.");
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        try {
            const response = await axios.post('/api/forgot-password', { 
                identifier, 
                newPassword 
            });
            setSuccess(true);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };
    return (
        <>
        <NavBar1 />
            <div className="p-6 min-h-[83.41vh] bg-lavender flex flex-col items-center justify-center">
                <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                    {!verified && !success && (
                        <>
                        <h2 className="text-xl font-semibold mb-4 text-center">Reset Your Password</h2>
                        <form onSubmit={handleVerify} className="space-y-4">
                            <input text="text" 
                                    placeholder="Email, Username, or Phone Number" 
                                    value={identifier} onChange={(e) => setIdentifier(e.target.value)} 
                                    className="w-full p-3 border rounded-md" 
                                    required />
                            <button type="submit"
                                    className="w-full bg-blueishGrey text-cream p-3 rounded-md hover:bg-darkBlueishGrey transition duration-200">
                                Verify Account
                            </button>        
                        </form>
                        </>
                    )}
                </div>
            </div>
        <Footer />
        </>
    );
};