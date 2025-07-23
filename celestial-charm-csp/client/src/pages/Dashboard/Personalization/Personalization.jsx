import React from "react";
import './Personalization.css';
import { Link } from "react-router-dom";
import Navbar3 from "../../../components/NavBars/Navbar3";
import Footer from "../../../components/Footer/Footer";

export default function Personalization() {
    return (
        <>
        <Navbar3 />
        <div className="personalization-container">
        <div className="quiz-cards">
            <Link to="/books" className="card">
            <img src="/assets/romance.jpg" alt="Books" />
            <div className="card-content">
                <h3>Books</h3>
                <p>Look for books from genres like romance, mystery, comeddy, and etc.</p>
            </div>
            </Link>
            <Link to="/music" className="card">
            <img src="/assets/spotify2.jpg" alt="Spotify" />
            <div className="card-content">
                <h3>Spotify</h3>
                <p>Add songs or OST's to your playlist here.</p>
            </div>
            </Link>
            <Link to="/blog" className="card">
            <img src="/assets/blog.jpg" alt="Blog" />
            <div className="card-content">
                <h3>Blog</h3>
                <p>View other people's reviews and add your's here!</p>
            </div>
            </Link>
        </div>

        <section className="reviews">
            <h2>Customer's Reviews</h2>
            <div className="review-cards">
            <div className="review-card">
                <img src="/assets/Kim Hongjoong.jpg" alt="Soojin Moon" className="review-avatar" />
                <h4>Soojin Moon</h4>
                <p>@moonlight_soo</p>
                <p>I was obsessed with the K-pop looks—Celestial Charm nailed it. Found the perfect Sana-inspired earrings!</p>
            </div>
            <div className="review-card">
                <img src="/assets/Seonghwa.JPG" alt="Ren Kazuki" className="review-avatar" />
                <h4>Ren Kazuki</h4>
                <p>@renverse</p>
                <p>Legit the best quiz experience. Anime-fit recommendations were 100% my vibe. Added 4 pieces to my wishlist.</p>
            </div>
            <div className="review-card">
                <img src="/assets/hongjoong-halazia2.jpg" alt="Hikari Chan" className="review-avatar" />
                <h4>Hikari Chan</h4>
                <p>@kawaii.hika</p>
                <p>Felt like the site just *knew* me. Love how everything's organized by vibe and fandom!</p>
            </div>
            </div>
        </section>
        </div>
        <Footer />
        </>
    );
}