import { Link, useLocation } from "react-router-dom";
import "./Navbar1.css";
import { useState } from "react";


export default function NavBar() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleMobile = () => {
        setMobileOpen(!mobileOpen);
        setMenuOpen("");
    };

    return (
        <nav className="navbar">
        {/* Logo and Title */}
        <Link to="/" className="navbar-logo">
            <img src="/assets/Neutral Beige Simple Aesthetic Flower Boutique Logo.jpg" alt="Logo" className="logo-img" />
            <span className="logo-text">Celestial Charm</span>
        </Link>

      {/* Navigation Links */}
      {/* Desktop */}
    <div className={`navbar-links desktop-only ${menuOpen ? "open" : ""}`}>
        <Link to="/store" className={`nav-link ${location.pathname === '/store' ? 'active-link' : ''}`} onClick={() => setMenuOpen(false)}>Store</Link>
        <Link to="/kpop" className={`nav-link ${location.pathname === '/kpop' ? 'active-link' : ''}`} onClick={() => setMenuOpen(false)}>Kpop</Link>
        <Link to="/anime" className={`nav-link ${location.pathname === '/anime' ? 'active-link' : ''}`} onClick={() => setMenuOpen(false)}>Anime</Link>
        <Link to="/register" className="special-link" onClick={() => setMenuOpen(false)}>Register</Link>
        <Link to="/login" className="special-link" onClick={() => setMenuOpen(false)}>Login</Link>
    </div>

    {/* Mobile */}
    <div className="hamburger" onClick={toggleMobile}>
        <div className={`bar ${mobileOpen ? "open" : ""}`}></div>
        <div className={`bar ${mobileOpen ? "open" : ""}`}></div>
        <div className={`bar ${mobileOpen ? "open" : ""}`}></div>
        
    </div>
    
    <div className={`mobile-menu ${mobileOpen ? "active" : ""}`}>
        <br />
        <Link to="/store" className={`nav-link ${location.pathname === '/store' ? 'active-link' : ''}`} onClick={toggleMobile}>Store</Link>
        <Link to="/kpop" className={`nav-link ${location.pathname === '/kpop' ? 'active-link' : ''}`} onClick={toggleMobile}>Kpop</Link>
        <Link to="/anime" className={`nav-link ${location.pathname === '/anime' ? 'active-link' : ''}`} onClick={toggleMobile}>Anime</Link>
        <Link to="/register" className="special-link" onClick={toggleMobile}>Register</Link>
        <Link to="/login" className="special-link" onClick={toggleMobile}>Login</Link>
    </div>
    </nav>
);
}
