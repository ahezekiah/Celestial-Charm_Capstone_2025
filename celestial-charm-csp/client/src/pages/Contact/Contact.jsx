import React from 'react'
import Footer from '../../components/Footer/Footer';
import '../../components/infoPages.css';


export default function Contact() {
    return (
        <>
            <div className='info-page'>
                <div className="info-page-container">
                <h1>Contact Us</h1>
                <form className="contact-form">
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <textarea placeholder="Your Message" rows="4" required />
                    <button type="submit">Send Message</button>
                </form>
                <div className="social-links">
                    <a href="https://x.com" target="_blank" rel="noreferrer"><i className="bi bi-twitter-x"></i></a>
                    <a href="https://www.youtube.com" target="_blank" rel="noreferrer"><i className="bi bi-youtube"></i></a>
                    <a href="https://www.tiktok.com" target="_blank" rel="noreferrer"><i className="bi bi-tiktok"></i></a>
                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><i className="bi bi-instagram"></i></a>
                    <a href="https://www.pinterest.com" target="_blank" rel="noreferrer"><i className="bi bi-pinterest"></i></a>
                    <a href="https://www.facebook.com" target="_blank" rel="noreferrer"><i className="bi bi-facebook"></i></a>
                    <a href="mailto:ahezekiah2025@celestial-charm.shop"><i className="bi bi-envelope-paper-heart-fill"></i></a>
                </div>
                </div>
            </div>
        <Footer />
        </>
    );
};