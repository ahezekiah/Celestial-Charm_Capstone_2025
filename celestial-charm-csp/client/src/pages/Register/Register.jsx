import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Footer from "../../components/Footer/Footer";
import NavBar2 from "../../components/NavBars/Navbar2";
import { useAuth } from "../../context/AuthProvider";
import { api } from "../../api/http";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        username: "",
        phoneNumber: "",
        birthday: "",
        email: "",
        password: "",
        profilePicture: "", // base64
    });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { refreshMe } = useAuth();

    function handleChange(e) {
        const { name, value, files, type } = e.target;
        setForm((prev) => ({
            ...prev,
        [name]: type === "file" ? files?.[0] ?? "" : value,
        }));
    }

    function handleImageUpload(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () =>
            setForm((prev) => ({ ...prev, profilePicture: reader.result }));
        reader.readAsDataURL(file);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
        // IMPORTANT: send JSON with the correct header so Express can read req.body
        const res = await api("/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || `HTTP ${res.status}`);
        }

        await refreshMe(); // get the logged-in user after register
        navigate("/dashboard", { replace: true });
        } catch (err) {
            console.error("Register error:", err);
            setMessage(err.message || "Registration failed");
        }
    }

    return (
        <div className="register-page">
        <NavBar2 />
        <div className="register-container">
            <h1>Register For An Account Here!</h1>

            <form className="register-form" onSubmit={handleSubmit}>
                {message && <div className="login-message">{message}</div>}

                <div className="register-row">
                    <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="register-row">
                    <input
                        name="phoneNumber"
                        type="text"
                        placeholder="Phone Number"
                        value={form.phoneNumber}
                        onChange={handleChange}
                    />
                    <input
                        name="birthday"
                        type="text"
                        placeholder="Birthday"
                        value={form.birthday}
                        onChange={handleChange}
                    />
                </div>

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <div className="register-row">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                <button type="button" onClick={() => setShowPassword((s) => !s)}>
                    {showPassword ? (
                        <i className="bi bi-eye text-lightTeal hover:text-teal" />
                    ) : (
                        <i className="bi bi-eye-slash text-teal hover:text-lightTeal" />
                    )}
                </button>
            </div>

            {form.profilePicture && (
                <>
                    <img src={form.profilePicture} alt="Preview" className="pfp-preview" />
                    <button
                        type="button"
                        className="clear-pfp-btn"
                        onClick={() => setForm((p) => ({ ...p, profilePicture: "" }))}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </>
            )}

                <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleImageUpload}
                />

                <button type="submit" className="register-btn">
                    Register
                </button>
            </form>

            <div className="register-footer">
                Already have an account? <a href="/login">Login</a>
            </div>
        </div>
        <Footer />
        </div>
    );
}
