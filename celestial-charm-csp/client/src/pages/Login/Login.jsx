import React, { useState, useEffect } from "react";
import "./Login.css";
import Footer from "../../components/Footer/Footer";
import NavBar2 from "../../components/NavBars/Navbar2";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function Login() {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth(); // ⬅ use provider only
    const [error, setError] = useState("");

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message);
            const t = setTimeout(() => setMessage(""), 3000);
            return () => clearTimeout(t);
        }
    }, [location.state]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {

            
            await login({ emailOrUsername, password });
            navigate('/dashboard'); // or wherever your “logged in” page is
        } catch (err) {
            setError(err.message || 'Login failed');
        }
};
    return (
        <>
        <NavBar2 />
        <div className="login-page">
            
            <div className="login-container">
                <h1>Login Here!</h1>

                {error ? (
                    <p className="error-messasge" role="alert">{error}</p>
                ) : null}
                <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-row">
                    
                    <input
                        name="emailOrUsername"
                        type="text"
                        placeholder="Email or Username"
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        autoComplete="username" />
                </div>

                <div className="display flex items-center justify-center gap-4 ">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password" />
                    <label onClick={() => setShowPassword((s) => !s)}>
                        {showPassword ? (
                            <i className="bi bi-eye text-lightTeal hover:text-teal" />
                        ) : (
                            <i className="bi bi-eye-slash text-teal hover:text-lightTeal" />
                        )}
                    </label>
                </div>

                    
                    <button type="submit">Login</button>
                </form>

                <div className="login-footer">
                    Don&apos;t have an account? {" "}<a href="/register">Register</a>
                </div>
                <div className="login-footer">
                <a href="/forgot-username">Forgot Username?</a> |{" "}
                <a href="/forgot-password">Forgot Password?</a>
                </div>
            </div>
            
        </div>

        <Footer />
        </>
        
    );
}
