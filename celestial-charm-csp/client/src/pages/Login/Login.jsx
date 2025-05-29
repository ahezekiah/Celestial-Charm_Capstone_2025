import { useState } from "react";
// import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import './Login.css';
import Footer from '../../components/Footer/Footer'
import NavBar2 from "../../components/NavBars/Navbar2";
import { useNavigate } from "react-router-dom";
// import { sendPasswordResetEmail } from "firebase/auth";


export default function Login() {
    
    const [form, setForm] = useState({
        username: "",
        // email: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        let userEmail = form.email;
        try {
            
            if(!form.email && form.username) {
                const response = await axios.get(`http://localhost:5000/api/auth/find-email/${form.username}`);
                userEmail = response.data.email;
            }

            await signInWithEmailAndPassword(auth, userEmail, form.password);
            navigate("/dashboard");
            console.log("User logged in successfully:", userEmail);
        } catch (error) {
            console.error(error);
            alert("Trouble logging in user. Please try again.");
        }
    };
    return (
        <div className="login-page">
        <NavBar2 />
        <div className="login-container">
            <h1>Login Here!</h1>
            <form className="login-form" onSubmit={handleSubmit}>
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