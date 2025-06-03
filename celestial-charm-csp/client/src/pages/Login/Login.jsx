import { useState, useEffect } from "react";
import './Login.css';
import Footer from '../../components/Footer/Footer'
import NavBar2 from "../../components/NavBars/Navbar2";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";



export default function Login() {
    const { login } = useUser();
    const [form, setForm] = useState({
        emailOrUsername: "",
        password: ""
    });
    const navigate = useNavigate();
    const location = useLocation();
    
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
            const res = await fetch('http://localhost:5000/api/auth/login',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if(res.ok){
                login({ username: data.username, token: data.token });
                navigate("/dashboard");
            }else {
                alert(data.error);
                console.log("User logged in successfully:", emailOrUsername);
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
                    <input name="username" type="text" placeholder="Username" value={form.username} onChange={handleChange} required />
                </div>
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <div className="login-footer">
                Don't have an account? <a href="/register">Register</a>
            </div>
        </div>
        <Footer />
        </div>

    );
};