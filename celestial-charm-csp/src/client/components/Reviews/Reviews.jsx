import NavBar from "../NavBars/Navbar1";
import Footer from "../Footer";
import "./Reviews.css";

export default function Reviews() {
    return (
        <div className="reviews-container">
            <NavBar />
            <p>Register or login to leave a review!</p>
            <Footer />
        </div>
    );
}