import React, { useState, useEffect } from "react";
import "./Login.css";
import Footer from "../../components/Footer/Footer";
import NavBar2 from "../../components/NavBars/Navbar2";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { api } from "../../api/http";


// const api = (path, opts = {}) =>
// fetch(`/api${path}`, {
//     credentials: "include",
//     headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
//     ...opts,
// }).then(async (r) => {
//     const data = await r.json().catch(() => ({}));
//     if (!r.ok) throw new Error(data.message || "Request failed");
//     return data;
// });



export default function Login() {
    const [form, setForm] = useState({ emailOrUsername: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { login, refreshMe } = useAuth(); // ⬅ use provider only
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
        setError("");
        if (!form.emailOrUsername || !form.password) {
            setError("Please enter your email/username and password.");
            return;
        }
        try {
            setSubmitting(true);
            await api("/auth/login", {
                method: "POST",
                body: JSON.stringify({
                emailOrUsername: form.emailOrUsername, // <-- exact keys the API expects
                password: form.password,
            }),
        });
        // session cookie is now set; go wherever you want
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setSubmitting(false);
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
