import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Footer from "../../components/Footer/Footer";
import NavBar2 from "../../components/NavBars/Navbar2";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";


export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        birthday: "",         // "YYYY-MM-DD"
        profilePicture: "",   // data URL string
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const { setUser } = useAuth();

    // const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profilePicture" && files?.[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm((prev) => ({ ...prev, profilePicture: reader.result }));
        };
            reader.readAsDataURL(files[0]);
            return;
        }
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
    if (!form.username.trim() || !form.email.trim() || !form.password)
        return "Please fill out all required fields.";

    if (form.password.length < 8)
        return "Password must be at least 8 characters.";

    if (form.password !== form.confirmPassword)
        return "Passwords do not match.";

    // Optional: quick sanity checks
    if (form.phoneNumber && !/^[0-9\-+() ]{7,20}$/.test(form.phoneNumber))
        return "Phone number looks invalid.";

        return "";
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const msg = validate();
        if (msg) {
            setError(msg);
            return;
        }

        try {
            setSubmitting(true);

            // Build payload (include optional fields if provided)
            const payload = {
                name: form.name || undefined,
                username: form.username,
                email: form.email,
                password: form.password,
                phoneNumber: form.phoneNumber || undefined,
                birthday: form.birthday || undefined,        // "YYYY-MM-DD" from <input type="date" />
                profilePicture: form.profilePicture || undefined, // base64 data URL
            };

            await api("/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            // Session cookie gets set by the server. Now fetch current user.
            const me = await api("/auth/me");
            setUser(me.user);
            navigate("/dashboard");
        } catch (err) {
            // Try to surface server message if present
            const message =
                (err && err.message) ||
                "Registration failed. Please try again.";
            setError(message);
            console.error("Register error:", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
        <NavBar2 />
            <div className="register-page">
        
        <div className="register-container">
            <h1>Register For An Account Here!</h1>

            {error ? (
                <p className="error-messasge" role="alert">{error}</p>
            ) : null}
            <form className="register-form" onSubmit={handleSubmit}>
                {/* {message && <div className="register-messagee">{message}</div>} */}

                <div className="register-row">
                    <div>
                    <label>Name
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="(Optional)"
                        />
                    </label>                    
                    </div>
                    
                    <div>
                    <label className="text-red-700">Username *
                        <input
                            name="username"
                            type="text"
                            autoComplete="username"
                            value={form.username}
                            onChange={handleChange} 
                            required/>
                    </label>                    
                    </div>                    
                </div>

                <div className="register-row">
                    <div>
                        <label>Phone Number 
                            <input
                                name="phoneNumber"
                                type="tel"
                                inputMode="tel"
                                placeholder="e.g. 123-456-7890 (Optional)"
                                value={form.phoneNumber}
                                onChange={handleChange}/>   
                        </label>
                    </div>
                    
                    <div>
                        <label>Birthday
                            <input
                                name="birthday"
                                type="date"
                                placeholder="(Optional)"
                                value={form.birthday || ""}
                                onChange={handleChange}/>
                        </label>
                    </div>
                </div>

                <div>
                    <label className="text-red-700">* Email
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            autoComplete="email"
                            onChange={handleChange}
                            required/>
                    </label>
                </div>
                

                <div className="register-row">
                    <div>
                        <label className="text-red-700">* Password</label>
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange} 
                            required/>
                        <button type="button" onClick={() => setShowPassword((s) => !s)}>
                            {showPassword ? (
                                <i className="bi bi-eye text-lightTeal hover:text-teal" />
                            ) : (
                                <i className="bi bi-eye-slash text-teal hover:text-lightTeal" />
                            )}
                        </button>
                    </div>

                    <div>
                        <label className="text-red-700">* Confirm Password
                            <input
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                value={form.confirmPassword}
                                onChange={handleChange} 
                                autoComplete="new-password"
                                required/>
                        <button type="button" onClick={() => setShowPassword((s) => !s)}>
                            {showPassword ? (
                                <i className="bi bi-eye text-lightTeal hover:text-teal" />
                            ) : (
                                <i className="bi bi-eye-slash text-teal hover:text-lightTeal" />
                            )}
                    </button>
                        </label>
                        
                    </div>
                </div>
            
            <div>
                <label>Profile Picture (optional)
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        name="profilePicture"
                    />
                </label>
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
                
            
            </div>
                <button
                    type="submit"
                    className="register-btn"
                    disabled={submitting}>
                    {submitting ? "Creating account…" : "Sign up"}
                </button>
            </form>

            <div className="register-footer">
                Already have an account? {" "}<a href="/login">Login</a>
            </div>
        </div>
        
        </div>



        <Footer />
        </>
        
    );
}
