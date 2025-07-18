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
                newPassword,
            });
            setSuccess(true);
            setMessage(response.data.message);
        } catch (error) {
            if (error.response){
                setMessage(error.response.data.message || "An error occurred. Please try again.");
            } else {
                setMessage("Server error. Please try again later.");
            }
            
        }
    };
    return (
        <>
        <NavBar1 />
            <div className="p-6 min-h-[83.41vh] bg-lavender flex flex-col items-center justify-center">
                <div className="max-w-screen-sm w-full bg-white p-6 rounded-lg shadow-md">
                    {!verified && !success && (
                        <>
                        <h2 className="text-xl font-bold mb-4 text-center">Verify Your Account</h2>
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
                            {message === "Account not found." && (
                                <p className="text-red-600 text-sm font-semibold text-center">{message} 
                                <label className="text-black"> | </label> 
                                <Link to="/register" className="text-lightTeal hover:text-teal hover:underline">Register Here!</Link></p>
                            )}
                            {message && message !== "Account not found." && <p className="text-red-600 text-center text-sm font-semibold">{message} 
                                <label className="text-black"> | </label> 
                                <Link to="/register" className="text-lightTeal hover:text-teal hover:underline">Register Here!</Link></p>}
                        </form>
                        </>
                    )}
                    {verified && !success && (
                        <>
                        <h2 className="text-xl font-bold mb-4 text-center">Reset Your Password</h2>
                        <form onSubmit={handleReset} className="space-y-4">
                            <input type={showNew ? "text" : "password"} 
                                    placeholder="New Password" 
                                    value={newPassword} onChange={(e) => setNewPassword(e.target.value)} 
                                    className="w-full p-3 border rounded-md pr-10" 
                                    required />
                            <button type="button" 
                                    onClick={() => setShowNew(!showNew)}> 
                                {showNew ? <i className="bi bi-eye text-lightTeal hover:text-teal"></i> : <i className="bi bi-eye-slash text-teal hover:text-lightTeal"></i>}
                            </button>
                            <input type={showConfirm ? "text" : "password"} 
                                    placeholder="Confirm New Password" 
                                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
                                    className="w-full p-3 border rounded-md" 
                                    required />
                            <button type="button" 
                                    onClick={() => setShowConfirm(!showConfirm)}>
                                {showConfirm ? <i className="bi bi-eye text-lightTeal hover:text-teal"></i> : <i className="bi bi-eye-slash text-teal hover:text-lightTeal"></i>}
                            </button>
                            <button type="submit"
                                    className="w-full bg-blueishGrey text-cream p-3 rounded-md hover:bg-darkBlueishGrey transition duration-200">
                                Reset Password
                            </button>
                            {message && <p className="text-purple-600 text-sm font-semibold text-center">{message}</p>}
                        </form>
                        </>
                    )}
                    {success && (
                        <div className="text-center space-y-4">
                            <h2 className="text-xl font-bold mb-4 text-green-700">Password Reset Successful!</h2>
                            {/* <label className="text-lightTeal mt-4 font-semibold"> | </label> */}
                            <label className="text-lightTeal mt-4 font-semibold hover:text-teal hover:underline"> <a href="/login">Login Here</a> </label>
                            {/* <p className="text-gray-700 mb-4">You can now log in with your new password.</p> */}
                            {/* <Link to="/login" className="text-lightTeal p-3  hover:text-teal hover:underline transition duration-200">
                                Go to Login
                            </Link> */}
                        </div>
                    )}
                </div>
            </div>
        <Footer />
        </>
    );
};