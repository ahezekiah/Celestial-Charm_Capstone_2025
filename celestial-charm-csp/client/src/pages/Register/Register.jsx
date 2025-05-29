import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';
import Footer from "../../components/Footer/Footer";
import NavBar2 from "../../components/NavBars/Navbar2";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        username: "",
        phoneNumber: Number,
        birthday: Date,
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if(res.ok){
                console.log("User registered successfully:", username);
                navigate("/dashboard");
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error(error);
            alert("Trouble registering user. Please try again.");
        }
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
                        <input name="phoneNumber" type="number" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} required />
                        <input name="birthday" type="date" placeholder="Birthday" value={form.birthday} onChange={handleChange} required />
                    </div>
                    <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                    <button type="submit">Register</button>
                </form>
                <div className="register-footer">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </div>
            <Footer />
        </div>
    
    );
};