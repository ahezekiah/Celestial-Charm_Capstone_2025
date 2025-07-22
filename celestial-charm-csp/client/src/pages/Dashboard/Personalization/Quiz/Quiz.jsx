import Navbar3 from "../../../../components/NavBars/Navbar3";
import Footer from "../../../../components/Footer/Footer";
import { Link } from "react-router-dom";
import "./Quiz.css";


export default function Quiz() {
    return (
        <>
        <Navbar3 />
        <div className="quiz-page">
            <h1>Personalization Quizzes</h1>
            <p>Choose a quiz to get started:</p>
            <div className="quiz-options">
                <Link to="/quiz/knowledge" className="quiz-link">
                    <img src="/assets/Wireframe Dither GIF by PERFECTL00P.gif" alt="Knowledge Quiz" className="quiz-image"/>
                    <h3>Knowledge Quiz</h3>
                </Link>

                <Link to="/quiz/personality" className="quiz-link">
                    <img src="/assets/Disney Channel GIF.gif" alt="Personality Quiz"  className="quiz-image"/>
                    <h3>Personality Quiz</h3>
                </Link>
            </div>

            
            <p>These quizzes will help us tailor your experience on Celestial Charm.</p>
        </div>
        <Footer />
        </>
    );
}