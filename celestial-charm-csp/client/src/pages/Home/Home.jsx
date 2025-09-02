import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FAQ  from "../../components/FAQ/FAQ";
import Footer from "../../components/Footer/Footer";
import "./Home.css";
import React from "react";

export default function Home() {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hero-title">
                    Celestial Charm
                </motion.h1>
                <motion.img
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    src="/assets/Finger heart.jpg"
                    alt="Hero Pendant"
                    className="hero-img"/>
                <p className="hero-description">
                Browse for the perfect piece of jewelry, a signature fragrance, 
                a stylish item of clothing, or a book recommendation—
                curated with a touch of K-pop flair and anime-inspired vibes just for you.
                </p>
                <Link to="/store" className="hero-button" >Let's Shop</Link>
            </section>

            {/* Banner Section */}
            <section className='banner-section'>
                <img src="/assets/This is the.png" alt='Banner' className='banner-img'/>
            </section>

            {/* Categories */}
            <section className='category-section'>
                <div className='category'>
                    <img src="/assets/bts necklace.jpg" alt='Kpop' className='category-img'/>
                    <h3 className='category-title'>K-Pop</h3>
                    <p className='category-desc'>
                    A purple crystalized necklace inspired by the K-pop group BTS, with their fandom's color of purple.
                    </p>
                    <Link to="/kpop" className='category-button'>Shop Now</Link>
                </div>
                <div className='category'>
                    <img src="/assets/link click.jpg" alt='Anime' className='category-img'/>
                    <h3 className='category-title'>Anime</h3>
                    <p className='category-desc'>
                    A silver pendant based on the donghua (Chinese animation) Link Click.
                    </p>
                    <Link to="/anime" className='category-button'>Shop Now</Link>
                </div>
            </section>
            
            {/* FAQ Section */}
            <section className="faq-section">
                <h2 className="faq-title">FAQ</h2>
                <FAQ />
            </section>
            {/* CTA Section */}
            <section className="cta-section">
                <h2 className="cta-text">Come and Shop Now!</h2>
                <div className="cta-buttons">
                    <Link to="/register" className="cta-bttn">Register</Link>
                    <Link to="/login" className="cta-bttn">Login</Link>
                </div>
            </section>

            {/* Footer Section */}
            <Footer />
            
        </div>
    );
}
