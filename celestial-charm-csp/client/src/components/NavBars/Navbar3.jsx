import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar3.css';
import { useUser } from "../../context/UserContext";


export default function Navbar3() {
    const { user, logout } = useUser();
    const [menuOpen, setMenuOpen] = useState(""); 
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    // const [user] = useAuthState(auth);

    const handleLogout = async () => {
        try {
            await auth.signOut().then(() => navigate('/'));
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const toggleDropdown = (person) => {
        setMenuOpen((prev) => (prev === person ? "" : person));
    };

    const toggleMobile = () => {
        setMobileOpen(!mobileOpen);
        setMenuOpen("");
    };
    return(
        <>
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
                    <span className="welcome-message">
                        Welcome, {user?.name || user?.username}!
                    </span>
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
                    {section.charAt(0).toUpperCase() + section.slice(1)} <i className={`bi ${menuOpen === section ? 'bi-chevron-up rotate' : 'bi-chevron-down'} nav-icon`}/>
                    </Link>
                    {menuOpen === section && (
                    <div className="dropdown-menu">
                        {section === "shop" && (
                        <>
                            <Link to="/fashion" className="dropdown-link"><i className="bi bi-handbag-fill"></i> Fashion</Link>
                            <Link to="/fragrances" className="dropdown-link"><i className="bi bi-flower2"></i> Fragrances</Link>
                            <Link to="/jewelry" className="dropdown-link"><i className="bi bi-gem"></i> Jewelry</Link>
                        </>
                        )}
                        {section === "books" && (
                        <>
                            <Link to="/fantasy" className="dropdown-link"><i className="bi bi-fire"></i> Fantasy</Link>
                            <Link to="/romance" className="dropdown-link"><i className="bi bi-person-hearts"></i> Romance</Link>
                            <Link to="/mystery" className="dropdown-link"><i className="bi bi-person-bounding-box"></i> Mystery</Link>
                        </>
                        )}
                        {section === "personalization" && (
                        <>
                            <Link to="/quiz" className="dropdown-link"><i className="bi bi-clipboard2-data-fill"></i> Take Quiz</Link>
                            <Link to="/results" className="dropdown-link"><i className="bi bi-bar-chart-fill"></i> Quiz Results</Link>
                            <Link to="/wishlist" className="dropdown-link"><i className="bi bi-bookmark-heart-fill"></i> Wishlist</Link>
                        </>
                        )}
                        
                    </div>
                    )}
                </div>
                ))}
                <Link to='/account' className="nav-link">Account</Link>
                <button className="nav-cart"><i className="bi bi-cart-dash-fill"></i><a href="/cart"></a></button>
                <Link className="logout-link" onClick={handleLogout}>Logout</Link>
            </div>


        {/* Burger Icon for Mobile */}
        <div className="burger" onClick={toggleMobile}>
            <div className={`bar ${mobileOpen ? "open" : ""}`}></div>
            <div className={`bar ${mobileOpen ? "open" : ""}`}></div>
            <div className={`bar ${mobileOpen ? "open" : ""}`}></div>
        </div>
        
        {/* Mobile Menu */}
            <div className={`mobile-menu ${mobileOpen ? "active" : ""}`}>
                <br/>
            {[
                "shop",
                "books",
                "personalization"
            ].map((section) => (
                <div
                    key={section}
                    className="dropdown"
                    onMouseEnter={() => toggleDropdown(section)} 
                    onMouseLeave={() => setMenuOpen("")}>
                    <Link to={`/${section}`} className="dropdown-toggle">
                    {section.charAt(0).toUpperCase() + section.slice(1)} <i className={`bi ${menuOpen === section ? 'bi-chevron-up rotate' : 'bi-chevron-down'} nav-icon`}/>
                    </Link>
                <div className={`dropdown-menu ${menuOpen === section ? "visible" : ""}`}>
                {section === "shop" && (
                    <>
                    <Link to="/fashion" className="dropdown-link"><i className="bi bi-handbag-fill"></i> Fashion</Link>
                    <Link to="/fragrances" className="dropdown-link"><i className="bi bi-flower2"></i> Fragrances</Link>
                    <Link to="/jewelry" className="dropdown-link"><i className="bi bi-gem"></i> Jewelry</Link>
                    </>
                )}
                {section === "books" && (
                    <>
                    <Link to="/fantasy" className="dropdown-link"><i className="bi bi-fire"></i> Fantasy</Link>
                    <Link to="/romance" className="dropdown-link"><i className="bi bi-person-hearts"></i> Romance</Link>
                    <Link to="/mystery" className="dropdown-link"><i className="bi bi-person-bounding-box"></i> Mystery</Link>
                    </>
                )}
                {section === "personalization" && (
                    <>
                    <Link to="/quiz" className="dropdown-link"><i className="bi bi-clipboard2-data-fill"></i> Take Quiz</Link>
                    <Link to="/results" className="dropdown-link"><i className="bi bi-bar-chart-fill"></i> Quiz Results</Link>
                    <Link to="/wishlist" className="dropdown-link"><i className="bi bi-bookmark-heart-fill"></i> Wishlist</Link>
                    </>
                )}
                </div>
                </div>
            ))}
            {/* <p className="welcome-msg">Welcome, {user?.displayName || user?.email}</p> */}
            <Link to='/account' className="nav-link">Account</Link>
            <button className="nav-cart"><i className="bi bi-cart-dash-fill"></i><a href="/cart"></a></button>
            <Link className="logout-link" onClick={handleLogout}>Logout</Link>
            </div>    
        </nav>
        </>
    );
};