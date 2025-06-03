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
            <Link to="/quiz" className="card">
            <img src="/assets/quiz-2.jpg" alt="Take Quiz" />
            <div className="card-content">
                <h3>Take Quiz</h3>
                <p>Take a quiz to discover your preferences.</p>
            </div>
            </Link>
            <Link to="/results" className="card">
            <img src="/assets/quiz-results.jpg" alt="Quiz Answers" />
            <div className="card-content">
                <h3>Quiz Results</h3>
                <p>View your personalized results.</p>
            </div>
            </Link>
            <Link to="/wishlist" className="card">
            <img src="/assets/Wishlist.png" alt="Wishlist" />
            <div className="card-content">
                <h3>Wishlist</h3>
                <p>Create and manage your wishlists.</p>
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