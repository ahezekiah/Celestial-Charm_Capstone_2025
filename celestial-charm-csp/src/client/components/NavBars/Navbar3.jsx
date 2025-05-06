import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../../context/UserContext';
import './Navbar3.css';
import { auth } from '../../../firebase';

export default function Navbar3() {
    const user = useContext(UserContext);
    const [openMenu, setOpenMenu] = useState('');
    const navigate = useNavigate();
    // const toggleDropdown = (menu) => {
    //     setOpenMenu((prev) => (prev === menu ? '' : menu));
    // }
    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return(
        <nav className="nav-wrapper">
            <div className="nav-left">
                <Link to='/dashboard' className="nav-logo">
                    <img src="/assets/Neutral Beige Simple Aesthetic Flower Boutique Logo.jpg" alt="Logo" className="logo-img" />
                    <span className="nav-title">Celestial Charm</span>
                </Link>
            </div>
            <div className="nav-center">
                {user?.name && <span className="nav-welcome">Welcome, {user.name}</span>}
            </div>
            <div className="nav-right">
                {/* Personalization */}
                <div
                className="dropdown hoverable"
                onMouseEnter={() => setOpenMenu("personalization")}
                onMouseLeave={() => setOpenMenu("")}>
                <Link to="/personalization" className="dropdown-toggle">Personalization ⌄</Link>
                {openMenu === "personalization" && (
                    <div className="dropdown-menu">
                    <Link to="/quiz" className="dropdown-link quiz-link">◼ Take Quiz</Link>
                    <Link to="/results" className="dropdown-link">⚫ Quiz Results</Link>
                    <Link to="/wishlist" className="dropdown-link">🔺 Wishlist</Link>
                    </div>
                )}
                </div>
                {/* Shop */}
                <div
                className="dropdown hoverable"
                onMouseEnter={() => setOpenMenu("shop")}
                onMouseLeave={() => setOpenMenu("")}>
                <Link to="/shop" className="dropdown-toggle">Shop ⌄</Link>
                {openMenu === "shop" && (
                    <div className="dropdown-menu">
                    <Link to="/fashion" className="dropdown-link">◼ Fashion</Link>
                    <Link to="/fragrances" className="dropdown-link">⚫ Fragrances</Link>
                    <Link to="/jewelry" className="dropdown-link">🔺 Jewelry</Link>
                    </div>
                )}
                </div>
                {/* Books */}
                <div
                className="dropdown hoverable"
                onMouseEnter={() => setOpenMenu("books")}
                onMouseLeave={() => setOpenMenu("")}>
                <Link to="/books" className="dropdown-toggle">Books ⌄</Link>
                {openMenu === "books" && (
                    <div className="dropdown-menu">
                    <Link to="/fantasy" className="dropdown-link">◼ Fantasy</Link>
                    <Link to="/romance" className="dropdown-link">⚫ Romance</Link>
                    <Link to="/reviews" className="dropdown-link">🔺 Reviews</Link>
                    </div>
                )}
                </div>
                <Link to='/account' className="nav-link">Account</Link>
                <Link to='/cart' className="nav-link"><i class="bi bi-cart-fill"></i></Link>
                <button onClick={handleLogout} className="logout-link">Logout</button>

            </div>

        </nav>
    );
};