import NavBar from "../../../components/NavBars/Navbar1";
import Footer from "../../../components/Footer/Footer";
import "./Reviews.css";

export default function Reviews() {
    return (
        <>
        <NavBar />
            <div className="reviews-container">
            
            <p>See reviews here</p>
            <p>Register or login to leave a review!</p>
            
        </div>

        <Footer />
        </>
        
    );
}