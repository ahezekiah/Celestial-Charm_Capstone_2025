import React, { useState, useEffect } from "react";
import "./Login.css";
import Footer from "../../components/Footer/Footer";
import NavBar2 from "../../components/NavBars/Navbar2";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function Login() {
    const [form, setForm] = useState({ emailOrUsername: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { login, refreshMe } = useAuth(); // ⬅ use provider only

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
        try {
            await login(form.emailOrUsername.trim(), form.password);
            await refreshMe(); // fetch /auth/me once the cookie is set
            navigate("/dashboard", { replace: true });
        } catch (err) {
            console.error(err);
            setMessage(err?.message || "Login failed. Check your credentials.");
        }
    }

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
                    onChange={handleChange}
                    required
                />
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
