import NavBar from "../../components/NavBars/Navbar1";
import Footer from "../../components/Footer/Footer";
import "./PreAnime.css";

export default function Anime() {
    return (
        <div className="anime-container">
            <NavBar />
            {/* Anime Banner */}
            {/* <section className="anime-hero">
                <h1 className="anime-title">Anime</h1>
                <p className="anime-desc">Shop everything Anime here!</p>
            </section> */}

            {/* Anime Products */}
            {/* <section className="anime-products">
                <div className="product-card">
                    <img src="/assets/Anime.jpg" alt="Anime Product" className="product-img" />
                    <h2 className="product-name">Anime Product 1</h2>
                    <p className="product-price">$19.99</p>
                </div>
                
            </section> */}
                {/* Add more product cards as needed */}
            <Footer />
        </div>
    );
}