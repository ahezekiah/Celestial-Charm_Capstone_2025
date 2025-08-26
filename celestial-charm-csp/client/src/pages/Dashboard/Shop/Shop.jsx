import React from "react";
import Navbar3 from '../../../components/NavBars/Navbar3';
import Footer from "../../../components/Footer/Footer";
import "./Shop.css";
import { Link } from "react-router-dom";

export default function Shop() {

    return (
        <div className="shop-wrapper">
        <Navbar3 />
        <main className="shop-content">
            <div className="shop-container">
        <h1 className="shop-title">Explore Our Collections</h1>

        <div className="shop-grid">
            <Link to='/fashion' className="shop-card">
            <img src="/assets/It Girl Idol GIF by Calvin Klein.gif" alt="Fashion" className="shop-image" />
            <div className="shop-overlay">
                <h2>FASHION</h2>
            </div>
            </Link>

            <Link to='/fragrances' className="shop-card">
            <img src="/assets/Sexy Moon GIF by YSL Beauty USA.gif" alt="Fragrances" className="shop-image" />
            <div className="shop-overlay">
                <h2>FRAGRANCES</h2>
            </div>
            </Link>

            <Link to='/jewelry' className="shop-card">
            <img src="/assets/download.gif" alt="Jewelry" className="shop-image" />
            <div className="shop-overlay">
                <h2>JEWELRY</h2>
            </div>
            </Link>

            <Link to="/kpop2" className="shop-card">
            <img src="/assets/Mv Wonderland GIF by KPopSource.gif" alt="Kpop" className="shop-image" />
            <div className="shop-overlay">
                <h2>KPOP</h2>
            </div>
            </Link>

            <Link to="/anime2" className="shop-card">
            <img src="/assets/cowboy bebop smoking GIF.gif" alt="Anime" className="shop-image" />
            <div className="shop-overlay">
                <h2>ANIME</h2>
            </div>
            </Link>

            <Link to='/inventory' className="shop-card">
            <img src="/assets/Gut Health Fodmap GIF by FodShop.gif" alt="Inventory" className="shop-image" />
            <div className="shop-overlay">
                <h2>INVENTORY</h2>
            </div>
            </Link>
        </div>
        </div>
        </main>
            <Footer />
        </div>
    );
}