import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar3.css';
import { auth } from '../../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar3() {
    
    const [menuOpen, setMenuOpen] = useState(""); 
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const handleLogout = async () => {
        try {
            await auth.signOut().then(() => navigate('/'));
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const toggleDropdown = (name) => {
        setMenuOpen((prev) => (prev === name ? "" : name));
    };

    const toggleMobile = () => {
        setMobileOpen(!mobileOpen);
    };
    return(
        <nav className="nav-wrapper">
            {/* Left Side */}
            <div className="nav-left">
                <Link to='/dashboard' className="nav-logo">
                    <img src="/assets/Neutral Beige Simple Aesthetic Flower Boutique Logo.jpg" alt="Logo" className="logo-img" />
                    <span className="nav-title">Celestial Charm</span>
                </Link>
            </div>
            {/* Center */}
            <div className="nav-center">
                {user && (
                    <span className="welcome-message">
                        Welcome, {user?.name}!
                    </span>
                )}
            </div>


            
            {/* Right Side */}
            <div className="nav-right desktop-only">
                {["shop", "books", "personalization"].map((section) => (
                <div
                    key={section}
                    className="dropdown"
                    onMouseEnter={() => toggleDropdown(section)} 
                    onMouseLeave={() => setMenuOpen("")}>
                    <Link to={`/${section}`} className="dropdown-toggle">
                    {section.charAt(0).toUpperCase() + section.slice(1)} <i className="bi bi-chevron-down"></i>
                    </Link>
                    {menuOpen === section && (
                    <div className="dropdown-menu">
                        {section === "shop" && (
                        <>
                            <Link to="/fashion" className="dropdown-link"><i className="bi bi-handbag-fill"></i> Fashion</Link>
                            <Link to="/fragrances" className="dropdown-link"><i class="bi bi-flower3"></i>Fragrances</Link>
                            <Link to="/jewelry" className="dropdown-link"><i className="bi bi-gem"></i> Jewelry</Link>
                        </>
                        )}
                        {section === "books" && (
                        <>
                            <Link to="/fantasy" className="dropdown-link"><i className="bi bi-fire"></i> Fantasy</Link>
                            <Link to="/romance" className="dropdown-link"><i className="bi bi-person-hearts"></i> Romance</Link>
                            <Link to="/reviews" className="dropdown-link"><i className="bi bi-chat-left-heart-fill"></i> Reviews</Link>
                        </>
                        )}
                        {section === "personalization" && (
                        <>
                            <Link to="/quiz" className="dropdown-link"><i class="bi bi-clipboard2-data-fill"></i> Take Quiz</Link>
                            <Link to="/results" className="dropdown-link"><i className="bi bi-bar-chart-fill"></i> Quiz Results</Link>
                            <Link to="/wishlist" className="dropdown-link"><i class="bi bi-bookmark-heart-fill"></i> Wishlist</Link>
                        </>
                        )}
                        
                    </div>
                    )}
                </div>
                ))}
                <Link to='/account' className="nav-link">Account</Link>
                <Link to='/cart' className="nav-cart"><i className="bi bi-cart-dash-fill"></i></Link>
                <button onClick={handleLogout} className="logout-link">Logout</button>
            </div>


        {/* Burger Icon for Mobile */}
        <button
            className={`burger-toggle ${mobileOpen ? "open" : ""}`}
            onClick={toggleMobile}
            aria-label="Toggle menu">
        <span className="bar top"></span>
        <span className="bar middle"></span>
        <span className="bar bottom"></span>
        </button>


        {/* Mobile Menu */}
        {mobileOpen && (
            <div className="mobile-menu">
                <Link to="/shop" onClick={toggleMobile}>Shop</Link>
                <Link to="/fashion" onClick={toggleMobile}>Fashion</Link>
                <Link to="/fragrances" onClick={toggleMobile}>Fragrances</Link>
                <Link to="/jewelry" onClick={toggleMobile}>Jewelry</Link>

                <Link to="/books" onClick={toggleMobile}>Books</Link>
                <Link to="/fantasy" onClick={toggleMobile}>Fantasy</Link>
                <Link to="/romance" onClick={toggleMobile}>Romance</Link>
                <Link to="/reviews" onClick={toggleMobile}>Reviews</Link>

                <Link to="/personalization" onClick={toggleMobile}>Personalization</Link>
                <Link to="/quiz" onClick={toggleMobile}>Take Quiz</Link>
                <Link to="/results" onClick={toggleMobile}>Quiz Results</Link>
                <Link to="/wishlist" onClick={toggleMobile}>Wishlist</Link>
                <Link to='/account' className="nav-link">Account</Link>
                <Link to='/cart' className="nav-link"><i class="bi bi-cart-fill"></i></Link>
            <button onClick={handleLogout} className="logout-link">Logout</button>
            </div>
        )}
        </nav>
    );
};