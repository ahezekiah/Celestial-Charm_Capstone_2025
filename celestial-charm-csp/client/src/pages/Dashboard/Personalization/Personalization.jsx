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
                <h4>Eva Elle</h4>
                <p>@evaelle</p>
                <p>Thank you for building such an empowering tool, especially for designers! The site went from Figma to Framer in less than a week!</p>
            </div>
            <div className="review-card">
                <h4>Guy Mccoy</h4>
                <p>@mccoy</p>
                <p>Playing around with @framer while building a landing page for a side project. I'm terrible at animations, but they make it so easy!</p>
            </div>
            <div className="review-card">
                <h4>Kayla Ray</h4>
                <p>@kayray</p>
                <p>I've built pretty handy sites powered by Craft or WordPress in the past, but seeing @framer tackle CMS stuff so effortlessly is mind-boggling</p>
            </div>
            </div>
        </section>
        </div>
        <Footer />
        </>
    );
}