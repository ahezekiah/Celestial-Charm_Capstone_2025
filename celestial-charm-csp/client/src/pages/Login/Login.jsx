import React, { useState, useEffect } from "react";
import "./Login.css";
import Footer from "../../components/Footer/Footer.jsx";
import NavBar2 from "../../components/NavBars/Navbar2.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";


export default function Login() {
    const [form, setForm] = useState({ emailOrUsername: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { login, refreshMe, setUser, user } = useAuth(); // ⬅ use provider only
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message);
            const t = setTimeout(() => setMessage(""), 3000);
            return () => clearTimeout(t);
        }
    }, [location.state]);

    function handleChange(e) {
        if (!e?.target) return;
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    }

    async function handleSubmit(e) {
        
    e.preventDefault();
    setError('');
    try {
    await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername:'test_1', password:'Passw0rd!' })
    }).then(r=>r.json()).then(console.log)
    // get current user
    await fetch('/api/auth/me', { credentials:'include' }).then(r=>r.json()).then(console.log)
    // const { user } = await api('/auth/me');
    // setUser(user);
    navigate('/dashboard'); // or wherever your “logged in” page is
    } catch (err) {
    setError(err.message || 'Login failed');
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
                <label className="text-red-700">*</label>
                <input
                    name="emailOrUsername"
                    type="text"
                    placeholder="Email or Username"
                    value={form.emailOrUsername}
                    onChange={handleChange}
                    autoComplete="username" />
            </div>

            <div className="display flex items-center justify-center gap-4 ">
                <label className="text-red-700">*</label>
                <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password" />
                <label onClick={() => setShowPassword((s) => !s)}>
                {showPassword ? (
                    <i className="bi bi-eye text-lightTeal hover:text-teal" />
                ) : (
                    <i className="bi bi-eye-slash text-teal hover:text-lightTeal" />
                )}
                </label>
            </div>

                {error && <p className="text-red-500">{error}</p>}
                <button disabled={submitting}>Login</button>
            </form>

            <div className="login-footer">
            Don&apos;t have an account? <a href="/register">Register</a>
            </div>
            <div className="login-footer">
            <a href="/forgot-username">Forgot Username?</a> |{" "}
            <a href="/forgot-password">Forgot Password?</a>
            </div>
        </div>
        <Footer />
        </div>
    );
}
