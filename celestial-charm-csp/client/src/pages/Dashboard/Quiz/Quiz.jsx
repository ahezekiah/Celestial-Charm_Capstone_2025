import Navbar3 from "../../../components/NavBars/Navbar3";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";
import "./Quiz.css";


export default function Quiz() {
    return (
        <>
        <Navbar3 />
        <div className="quiz-wrapper">
            <main className="quiz-content">
                <div className="quiz-container">
                    <h1 className="quiz-title">Choose Your Path</h1>
                    <p className="quiz-subtitle">Personalize your experience with one of these tailored quizzes.</p>
                    <div className="quiz-grid">
                            <Link to="/knowledge" className="quiz-card">
                            <img src='/assets/K-Pop Genius GIF by BuzzFeed.gif' alt="Knowledge Quiz" className="quiz-image" />
                            <div className="quiz-overlay">
                                <h2>KNOWLEDGE QUIZ</h2>
                            </div>
                            </Link>

                            <Link to="/personality" className="quiz-card">
                            <img src='/assets/sailor moon GIF.gif' alt="Personality Quiz" className="quiz-image" />
                            <div className="quiz-overlay">
                                <h2>PERSONALITY QUIZ</h2>
                            </div>
                        </Link>
                    </div>
                    <br />
                    <p className="quiz-subtitle">These quizzes will help us tailor your experience on Celestial Charm.</p>
                </div>
            </main>
        </div>
            
        <Footer />
        </>
    );
}