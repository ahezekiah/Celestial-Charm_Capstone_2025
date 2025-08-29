import React, { useState, useEffect } from "react";
import './Login.css';
import Footer from '../../components/Footer/Footer'
import NavBar2 from "../../components/NavBars/Navbar2";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { api } from '../../api/http';
import { useAuth } from "../../context/AuthProvider";


export default function Login() {
    const { login, refreshUser } = useUser();
    const [form, setForm] = useState({
        emailOrUsername: "",
        password: ""
    });
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const { setUser } = useAuth();

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message);
            // Clear the message after displaying it
            setTimeout(() => {
                setMessage("");
            }, 3000); // Clear after 3 seconds
        }
    }, [location]);

    const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailOrUsername = e.target.emailOrUsername.value.trim();
        const password = e.target.password.value;
        try {
            await api('/auth/login', {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({ 
                    emailOrUsername, 
                    password 
                }), 
            });
            const { user } = await api('/auth/me'); 
            setUser(user);
            setMessage('Login successful!');
            navigate('/dashboard'); 
        } catch (err) {
            console.error(err);
            setMessage('Login failed. Check your credentials.');
        }
    };
    return (
        <div className="login-page">
        <NavBar2 />
        <div className="login-container">
            <h1>Login Here!</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                {message && <div className="login-message">{message}</div>}
                <div className="login-row">
                    <input 
                        name="emailOrUsername" 
                        type="text" 
                        placeholder="Email or Username" 
                        value={form.emailOrUsername} 
                        onChange={handleChange} required />
                </div>
                <div className="display flex items-center justify-center gap-4 ">
                        <input 
                            name="password" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            value={form.password} 
                            onChange={handleChange} 
                            required 
                        />
                        <label 
                            type="button" 
                            onClick={() => setShowPassword((s) => !s)}>
                            {showPassword 
                                ? <i className="bi bi-eye text-lightTeal hover:text-teal"></i> 
                                : <i className="bi bi-eye-slash text-teal hover:text-lightTeal"></i>}
                        </label>
                    </div>
                <button type="submit">Login</button>
            </form>
            <div className="login-footer">
                Don't have an account? <a href="/register">Register</a>
            </div>
            <div className="login-footer">
                <a href="/forgot-username">Forgot Username?</a> | <a href="/forgot-password">Forgot Password?</a>
            </div>
        </div>
        <Footer />
        </div>

    );
};