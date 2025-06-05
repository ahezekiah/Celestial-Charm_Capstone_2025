import React from 'react'
import Footer from '../../components/Footer/Footer';


export default function Contact() {
    return (
        <>
        <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
            <h1>Contact Us</h1>
            <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '1rem' }}>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" rows="4" required />
                <button type="submit">Send Message</button>
            </form>
            <div style={{ marginTop: '2rem' }}>
                <h3>Follow us:</h3>
                <p>
                    <a href="https://x.com" target="_blank" rel="noreferrer"><i className="bi bi-twitter-x"></i></a> |{' '}
                    <a href="https://www.youtube.com" target="_blank" rel="noreferrer"><i className="bi bi-youtube"></i></a> |{' '}
                    <a href="https://www.tiktok.com" target="_blank" rel="noreferrer"><i className="bi bi-tiktok"></i></a> |{' '}
                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><i className="bi bi-instagram"></i></a> |{' '}
                    <a href="https://www.pinterest.com" target="_blank" rel="noreferrer"><i className="bi bi-pinterest"></i></a> |{' '}
                    <a href="https://www.facebook.com" target="_blank" rel="noreferrer"><i className="bi bi-facebook"></i></a> |{' '}
                    <a href="mailto:contact@celestialcharm.com"><i className="bi bi-envelope-paper-heart-fill"></i></a>
                </p>
            </div>
        </div>
        <Footer />
        </>
    );
};