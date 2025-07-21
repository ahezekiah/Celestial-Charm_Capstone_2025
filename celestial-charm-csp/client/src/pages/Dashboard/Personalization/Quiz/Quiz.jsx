import Navbar3 from "../../../../components/NavBars/Navbar3";
import Footer from "../../../../components/Footer/Footer";
import { Link } from "react-router-dom";


export default function Quiz() {
    return (
        <>
        <Navbar3 />
        <div className="">
            <h1>Personalization Quizzes</h1>
            <p>Choose a quiz to get started:</p>
            <Link to="/quiz/knowledge" className="quiz-link">Knowledge Quiz</Link>
            <Link to="/quiz/personality" className="quiz-link">Personality Quiz</Link>
            <p>These quizzes will help us tailor your experience on Celestial Charm.</p>
        </div>
        <Footer />
        </>
    );
}