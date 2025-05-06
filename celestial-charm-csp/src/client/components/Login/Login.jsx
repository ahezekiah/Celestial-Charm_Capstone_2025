import { use, useState } from "react";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import './Login.css';
import Footer from '../Footer'
import NavBar2 from "../NavBars/Navbar2";


export default function Login() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            let userEmail = form.email;
            if(!form.email && form.username) {
                const response = await axios.get(`http://localhost:5000/api/auth/find-email/${form.username}`);
                userEmail = response.data.email;
            }

            await signInWithEmailAndPassword(auth, form.email, form.password);
            alert("User has been logged in!");
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
                    <input name="username" type="text" placeholder="Username (or leave blank)" value={form.username} onChange={handleChange} required />
                    <input name="email" type="email" placeholder="Email (or leave blank)" value={form.email} onChange={handleChange} required />
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