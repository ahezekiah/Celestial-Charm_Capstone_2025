import NavBar from "../../components/NavBars/Navbar1";
import Footer from "../../components/Footer/Footer";
import "./Store.css";
import { Link } from "react-router-dom";

export default function Store() {
    return (
        <div className="store-container">
            <NavBar />
        {/* Store Banner */}
            <section className="store-hero">
            </section>

        {/* Categories */}
        <section className="store-categories">
            <div className="category-card">
            <Link to="/kpop">
                <img src="/assets/bts-m.jpg" alt="Kpop" className="category-img-store" />
            </Link>
            <br/>
            <Link to="/kpop" className="category-title-store">Kpop</Link>
            {/* <h2 className="category-title">Kpop</h2> */}
            <p className="category-desc">Shop everything K-pop here!</p>
            </div>

            <div className="category-card">
            <Link to="/anime">
                <img src="/assets/jjk.jpg" alt="Anime" className="category-img-store" />
            </Link>
            <br/>
            <Link to="/anime" className="category-title-store">Anime</Link>
            {/* <h2 className="category-title">Anime</h2> */}
            <p className="category-desc">Shop everything Anime here!</p>
            </div>
        </section>

        {/* Testimonials */}
        <section className="store-testimonials">
            <Link to="/reviews" className="testimonial-title">Reviews</Link>
            {/* <h2 className="testimonial-title">Reviews</h2> */}
            <p className="testimonial-quote">
            “This is the perfect website for when I need to search for K-pop-themed outfits for concerts.”
            </p>

            <div className="testimonial-profile">
            <img src="/assets/Wonderland behind.jpg" alt="Kayla" className="testimonial-img" />
            <div className="testimonial-text">
                <h3 className="testimonial-name">KAYLA IS SEEING ATEEZ!!!</h3>
                <p className="testimonial-handle">@kayray</p>
            </div>
            </div>
        </section>
            <Footer />
        </div>

    );
}