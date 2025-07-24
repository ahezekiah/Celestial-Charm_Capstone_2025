import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar3.css';
import { useUser } from "../../context/UserContext";
import { useCartWishlist } from "../../context/CartWishlistContext";


export default function Navbar3() {
    const { user, logout } = useUser();
    const [menuOpen, setMenuOpen] = useState(""); 
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const { cart, wishlist } = useCartWishlist();
    const [ users, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('api/auth/me', {
                headers: { Authorization: `Bearer ${token}`},
            })
            .then((res) => res.json())
            .then((data) => setUser(data.user));
        }
    }, []);

    const handleLogout = async () => {
        logout();
        navigate("/");
        console.log("Logged out! Navigating to /");

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
            <div className="nav-misc">
                {user && (
                    <span className="welcome-message"> <Link to='/knowledge'><i className="bi bi-gem text-blueish"></i> {user?.gems || 0}</Link> 
                    <label className="text-lavender text-xl">  </label><Link to='/personality'><i className="bi bi-person-heart text-pinkish"></i> {user?.personalityType || 'Not Set'} <i className="bi bi-person-hearts text-pinkish"></i></Link>
                    </span>
                )}
            </div>
            
            
            {/* Right Side */}
            <div className="nav-right desktop-only">
                {["shop", "quiz", "personalization"].map((section) => (
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
                            <Link to="/jewelry" className="dropdown-link"><i className="bi bi-bluesky"></i> Jewelry</Link>
                        </>
                        )}
                        {section === "quiz" && (
                        <>
                            <Link to="/personality" className="dropdown-link"><i className="bi bi-clipboard2-heart-fill"></i> Personality</Link>
                            <Link to="/knowledge" className="dropdown-link"><i className="bi bi-clipboard2-data-fill"></i> Knowledge</Link>
                            <Link to="/results" className="dropdown-link"><i className="bi bi-bar-chart-fill"></i> Quiz Results</Link>
                        </>
                        )}
                        {section === "personalization" && (
                        <>
                            <Link to="/books" className="dropdown-link"><i className="bi bi-book-fill"></i> Books</Link>
                            <Link to="/music" className="dropdown-link"><i className="bi bi-spotify"></i> Spotify</Link>
                            <Link to="/blog" className="dropdown-link"><i className="bi bi-newspaper"></i> Blog</Link>
                        </>
                        )}
                    </div>
                    )}
                </div>
                ))}
                <Link to='/account' className="nav-link">Account</Link>
                <Link to="/wishlist" className="nav-cart">
                    <div className="icon-with-badge">
                        <i className="bi bi-bookmark-heart-fill"></i>
                        {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
                    </div>
                </Link>
                <Link to='/cart' className="nav-cart">
                    <div className="icon-with-badge">
                        <i className="bi bi-cart-fill"></i>
                        {cart.length > 0 && <span className="badge">{cart.length}</span>}
                    </div>
                </Link>

                <Link to='/' className="logout-link" onClick={handleLogout}>Logout</Link>
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
                "quiz",
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
                    <Link to="/jewelry" className="dropdown-link"><i className="bi bi-bluesky"></i> Jewelry</Link>
                    </>
                )}
                {section === "quiz" && (
                    <>
                    <Link to="/personality" className="dropdown-link"><i className="bi bi-clipboard2-heart-fill"></i> Personality</Link>
                    <Link to="/knowledge" className="dropdown-link"><i className="bi bi-clipboard2-data-fill"></i> Knowledge</Link>
                    <Link to="/results" className="dropdown-link"><i className="bi bi-bar-chart-fill"></i> Quiz Results</Link>
                    </>
                )}
                {section === "personalization" && (
                    <>
                    <Link to="/books" className="dropdown-link"><i className="bi bi-book-fill"></i> Books</Link>
                    <Link to="/music" className="dropdown-link"><i className="bi bi-spotify"></i> Spotify</Link>
                    <Link to="/blog" className="dropdown-link"><i className="bi bi-newspaper"></i> Blog</Link>
                    </>

                )}
                </div>
                </div>
            ))}
            {/* <p className="welcome-msg">Welcome, {user?.displayName || user?.email}</p> */}
            <Link to='/account' className="nav-link">Account</Link>
            <div className="nav-cart">
                <Link to="/wishlist" className="nav-cart">
                    <div className="icon-with-badge">
                        <i className="bi bi-bookmark-heart-fill"></i>
                        {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
                    </div>
                </Link>
                
                <Link to='/cart' className="nav-cart">
                    <div className="icon-with-badge">
                        <i className="bi bi-cart-fill"></i>
                        {cart.length > 0 && <span className="badge">{cart.length}</span>}
                    </div>
                </Link>
            </div>
            {/* <Link to="/wishlist" className="nav-cart">
                <div className="icon-with-badge">
                    <i className="bi bi-bookmark-heart-fill"></i>
                    {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
                </div>
            </Link>
            <Link to='/cart' className="nav-cart">
                <div className="icon-with-badge">
                    <i className="bi bi-cart-fill"></i>
                    {cart.length > 0 && <span className="badge">{cart.length}</span>}
                </div>
            </Link> */}
            <Link className="logout-link" onClick={handleLogout}>Logout</Link>

            </div>    
        </nav>
        </>
    );
};