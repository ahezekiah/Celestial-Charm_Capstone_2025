import { useState, useEffect } from "react";
import './Login.css';
import Footer from '../../components/Footer/Footer'
import NavBar2 from "../../components/NavBars/Navbar2";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { api } from '@/api/http';



export default function Login() {
    const { login, refreshUser } = useUser();
    // const BASE_URL = import.meta.env.VITE_API_URL || 'https://celestial-charm-capstone-2025.onrender.com';
    // console.log("Base URL:", BASE_URL);
    const [form, setForm] = useState({
        emailOrUsername: "",
        password: ""
    });
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message);
            // Clear the message after displaying it
            setTimeout(() => {
                setMessage("");
            }, 3000); // Clear after 3 seconds
        }
    }, [location]);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            console.log("Login payload:", {
                emailOrUsername: form.emailOrUsername,
                password: form.password
            });
            // const res = await fetch(`${BASE_URL}/api/auth/login`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         emailOrUsername: form.emailOrUsername,
            //         password: form.password
            //     }),
            // });

            // if (!res.ok) throw new Error('Login failed');
            
            // const data = await res.json();

            const payload = { emailOrUsername, password };
            const res = await api('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();

            localStorage.setItem('token', data.token);
            // localStorage.setItem('user', JSON.stringify(data.user));
            await refreshUser();
            

            setMessage('Login successful!');
            
            // setTimeout(() => navigate("/dashboard"), 100);
            login(data.user);
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
                    <input name="emailOrUsername" type="text" placeholder="Email or Username" value={form.username} onChange={handleChange} required />
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
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <i className="bi bi-eye text-lightTeal hover:text-teal"></i> : <i className="bi bi-eye-slash text-teal hover:text-lightTeal"></i>}
                        </label>
                    </div>
                {/* <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required /> */}
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