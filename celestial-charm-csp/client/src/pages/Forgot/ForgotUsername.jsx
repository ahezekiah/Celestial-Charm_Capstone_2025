import Footer from "../../components/Footer/Footer";
import NavBar1 from "../../components/NavBars/Navbar1";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function ForgotUsername() {
    const [message, setMessage] = useState("");
    const [type, setType] = useState("phone");
    const [result, setResult] = useState("");
    const [input, setInput] = useState("");

    const handleLookup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/forgot-username/lookup', { 
                phoneNumber: type === "phone" ? input : "", 
                birthday: type === "birthday" ? input : ""
            });
            setResult(response.data);
            setMessage("");
        } catch (error) {
            setResult("");
            setMessage(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    const handleGoBack = () => {
        setResult("");
        setMessage("");
        setInput("");
    };

    return(
        <>
        <NavBar1 />
        <div className="bg-lavender min-h-[83.41vh] flex items-center justify-center">
            <div className="p-4 max-w-screen-sm mx-auto">
            <h2 className="text-xl font-bold mb-4 text-center">Recover Username or Email</h2>
                {!result ? (
                    <form onSubmit={handleLookup} className="space-y-4">
                        <p className="text-gray-600 mb-4">Please provide either your phone number or birthday to recover your username and email.</p>
                        <select value={type} onChange={(e) => setType(e.target.value)} 
                        className="w-full p-2 border">
                            <option value="phone">Phone Number</option>
                            <option value="birthday">Birthday</option>
                        </select>
                        <input type="text" placeholder={type === 'phone' ? "Enter Phone Number (XXX-XXX-XXXX)" : "Enter Birthday (MM-DD-YYYY)"}
                        value={input} onChange={(e) => setInput(e.target.value)} className="w-full p-2 border" required/>
                        <button type="submit" className="bg-blueishGrey hover:bg-darkBlueishGrey text-cream p-3 mt-4 font-semibold rounded-md border-none shadow-lg items-center justify-center w-full">
                            Lookup Info</button>
                        {message && <p className="text-red-600 text-sm font-semibold text-center">{message} <label className="text-black"> | </label> <Link to="/register" className="text-lightTeal hover:text-teal hover:underline">Register Here!</Link></p>}
                    </form>
                    
                ) : (
                    <div className="space-y-4 text-gray-700 text-md">
                        <div>
                            <label className="block font-semibold">Username</label>
                            <input value={result.username} disabled className="w-full p-2 bg-gray-100 border" />
                        </div>
                        <div>
                            <label className="block font-semibold">Email</label>
                            <input value={result.email} disabled className="w-full p-2 bg-gray-100 border" />
                        </div>
                        <button onClick={handleGoBack} className="bg-blueishGrey hover:bg-darkBlueishGrey text-cream p-3 mt-4 font-semibold rounded-md border-none shadow-lg">Go Back</button>
                        <div>
                            <label className="text-lightTeal mt-4 font-semibold hover:text-teal hover:underline"><a href="/forgot-password">Forgot Password?</a></label>
                            <label className="text-lightTeal mt-4 font-semibold"> | </label>
                            <label className="text-lightTeal mt-4 font-semibold hover:text-teal hover:underline"> <a href="/login">Login Here</a> </label>
                        </div>
                        
                    </div>
                )}
            </div>
        </div>
        <Footer />
        </>
    );
}

// .login-form button {
//     padding: 0.75rem;
//     background-color: #4B5563;
//     color: #FFF7D0;
//     font-weight: 600;
//     border: none;
//     border-radius: 6px;
//     margin-top: 1rem;
//     box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
// }

// .login-form button:hover {
//     background-color: #374151;
// }