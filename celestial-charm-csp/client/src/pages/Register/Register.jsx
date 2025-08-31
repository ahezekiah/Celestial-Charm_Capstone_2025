import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';
import Footer from "../../components/Footer/Footer";
import NavBar2 from "../../components/NavBars/Navbar2";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthProvider";
import { api } from "../../api/http";

export default function Register() {
    const { login, refreshUser } = useUser();
    const [form, setForm] = useState({
        name: "",
        username: "",
        phoneNumber: "",
        birthday: "",
        email: "",
        password: "",
        profilePicture: "" 
    });
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const handleChange = e => setForm((f) => ({ ...f,  [e.target.name]: e.target.value }));

        const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, username, phoneNumber, birthday, email, password, profilePicture } = e.target.value;
        try {
                const res = await api('/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        username,
                        phoneNumber,
                        birthday,
                        email,
                        password,
                        profilePicture
                    }),
                });
            
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const me = await api('/auth/me'); 
            setUser(me.user);
            setMessage('Registration successful!');
            navigate('/dashboard');
        } catch (err) {
            console.error('Frontend error:', err);
            setMessage('Request failed: ' + err.message);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setForm((prevForm) => ({
                ...prevForm,
            profilePicture: reader.result,
            }));
        };
        reader.readAsDataURL(file);
    };


    return (
        <div className="register-page">
            <NavBar2 />
            <div className="register-container">
                <h1>Register For An Account Here!</h1>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="register-row">
                        <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />
                        <input name="username" type="text" placeholder="Username" value={form.username} onChange={handleChange} required />
                    </div>
                    <div className="register-row">
                        <input name="phoneNumber" type="text" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange}  />
                        <input name="birthday" type="text" placeholder="Birthday" value={form.birthday} onChange={handleChange}  />
                    </div>
                    <input name="email" type="text" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <div className="register-row">
                        <input 
                            name="password" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            value={form.password} 
                            onChange={handleChange} 
                            required 
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <i className="bi bi-eye text-lightTeal hover:text-teal"></i> : <i className="bi bi-eye-slash text-teal hover:text-lightTeal"></i>}
                        </button>
                    </div>
                    {form.profilePicture && (
                        <>
                            <img
                                src={form.profilePicture}
                                alt="Preview"
                                className="pfp-preview"/>
                            <button
                                type="button"
                                className="clear-pfp-btn"
                                onClick={() => setForm({ ...form, profilePicture: "" })}>
                            <i className="bi bi-x-lg"></i>
                            </button>
                        </>
                    )}
                    <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageUpload}/>
                    <button type="submit" className="register-btn">Register</button>
                </form>
                <div className="register-footer">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </div>
            <Footer />
        </div>
    
    );
};