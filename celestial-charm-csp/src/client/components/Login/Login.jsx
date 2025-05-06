import { useState } from "react";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import './Login.css';
import Footer from '../Footer'
import NavBar2 from "../NavBars/Navbar2";


export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, form.email, form.password);
            alert("User has been logged in!");
        } catch (error) {
            console.error(error);
            alert("Trouble logging in user. Please try again.");
        }
    };

    return (
        <>
        <NavBar2 />
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Login Here!</h1>
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <button type="submit">Login</button>
            <p>Don't have an account? <a href="/register">Register</a></p>
        </form>
        <Footer />
        </>

    );
};