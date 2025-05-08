import { Link, useLocation } from "react-router-dom";
import "./Navbar2.css";
import { useState } from "react";

export default function NavBar2() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    
    return (
        <nav className="navbar">
        {/* Logo and Title */}
        <Link to="/" className="navbar-logo">
            <img src="/assets/Neutral Beige Simple Aesthetic Flower Boutique Logo.jpg" alt="Logo" className="logo-img" />
            <span className="logo-text">Celestial Charm</span>
        </Link>

      {/* Navigation Links */}
      {/* Desktop */}
    <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/store" className={`nav-link ${location.pathname === '/store' ? 'active-link' : ''}`} onClick={() => setMenuOpen(false)}>Store</Link>
        <Link to="/kpop" className={`nav-link ${location.pathname === '/kpop' ? 'active-link' : ''}`} onClick={() => setMenuOpen(false)}>Kpop</Link>
        <Link to="/anime" className={`nav-link ${location.pathname === '/anime' ? 'active-link' : ''}`} onClick={() => setMenuOpen(false)}>Anime</Link>
    </div>

    {/* Mobile */}
    <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
    </div>
    </nav>
    );
}
