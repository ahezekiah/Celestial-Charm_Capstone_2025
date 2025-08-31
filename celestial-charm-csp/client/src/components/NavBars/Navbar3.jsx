import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import './Navbar3.css';
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthProvider";
import { useCartWishlist } from "../../context/CartWishlistContext";
import { getPersonalityMeta } from "../../utils/personalityMeta";


export default function Navbar3() {
    const { logout } = useUser();
    const [menuOpen, setMenuOpen] = useState(""); 
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const { cart, wishlist } = useCartWishlist();
    const [pulse, setPulse] = useState(false);
    const [deltaGems, setDeltaGems] = useState(0);
    const prevGemsRef = useRef(user?.gems || 0);
    // const { pathname } = useLocation();
    const { setUser } = useAuth();
    

    const displayName = (user?.name ?? user?.username ?? "-").toUpperCase();

    useEffect(() => {
        const currentGems = user?.gems ?? 0;
        const difference = currentGems - (prevGemsRef.current ?? 0);
        if (difference !== 0) {
            setDeltaGems(difference);
            setPulse(true);
            const time = setTimeout(() => setPulse(false), 2000); // Pulse for 2 seconds
            prevGemsRef.current = currentGems;
            return () => clearTimeout(time);
        }
        const { user } = api("/auth/me");
        setUser(user);
    }, [user?.gems]);

    const handleLogout = async () => {
        logout();
        navigate("/");
        console.log("Logged out! Navigating to /");
    };

    const PersonaBadge = () => {
        if (!user?.personalityType) return null;
        const meta = getPersonalityMeta(user.personalityType);
        return (
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-transparent text-sm"
            title={`${meta.code} · ${meta.name}`}>
            <span>{meta.emoji}</span>
            <span className="font-semibold">{meta.code} · {meta.name}</span>
        </div>
        );
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
                {user && (
                    <span className="welcome-message">
                    Welcome, {displayName}!
                </span>
                )}
            </div>


            <div className="nav-misc">
                <Link to='/personality' className="inline-flex items-center gap-2" aria-label="Personality Quiz">
                    <i className="bi bi-person-heart text-pinkish"></i> 
                        {/* {user?.personalityType || 'Not Set'} */}<PersonaBadge />
                    <i className="bi bi-person-hearts text-pinkish"></i>
                </Link>

                <label className="text-greyish text-xl"> &nbsp;|&nbsp; </label> 
                {user && (
                    <div
                        className={[
                            "inline-flex items-center gap-1 px-3 py-1 rounded-full bg-transparent font-medium",
                            pulse ? (deltaGems > 0 ? "ring-2 ring-green-400 animate-pulse" : "ring-2 ring-rose-400 animate-pulse") : ""
                        ].join(" ")}
                        title="Your gems & personality type"
                        aria-live="polite">
                        <Link to='/gem-shop'><i className="bi bi-gem text-blueish"></i></Link>
                        <span className="font-semibold">{user.gems ?? 0}</span>
                        
                        {/* tiny delta chip */}
                        {pulse && (
                            <span
                                className={`ml-1 text-xs font-semibold ${
                                    deltaGems > 0 ? "text-green-600" : "text-rose-600"}`}>
                                {deltaGems > 0 ? `+${deltaGems}` : `${deltaGems}`}
                            </span>
                        )}
                    </div>
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
            <Link className="logout-link" onClick={handleLogout}>Logout</Link>
            </div>    
        </nav>
        </>
    );
};