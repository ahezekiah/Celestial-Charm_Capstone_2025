import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <p>© Celestial Charm, 2025. All rights reserved.</p>
            <div className="footer-links">
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/policies">Policies</Link>
            </div>
    </footer>
);
}