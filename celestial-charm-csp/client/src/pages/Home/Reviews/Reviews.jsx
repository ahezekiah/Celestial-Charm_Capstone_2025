import NavBar from "../../../components/NavBars/Navbar1";
import Footer from "../../../components/Footer/Footer";
import "./Reviews.css";

export default function Reviews() {
    return (
        <>
        <NavBar />
            <div className="reviews-container">
            
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
                <div className="review-card">
                    <img src="/assets/Yeosang.jpg" alt="Mina Lee" className="review-avatar" />
                    <h4>Mina Lee</h4>
                    <p>@mina_lee</p>
                    <p>Shopping was a breeze. The K-pop section is fire, and the anime merch is to die for!</p>
                </div>
                <div className="review-card">
                    <img src="/assets/Wonderland behind.jpg" alt="Kayla" className="review-avatar" />
                    <h4>KAYLA IS SEEING ATEEZ!!!</h4>
                    <p>@kayray</p>
                    <p>This is the perfect website for when I need to search for K-pop-themed outfits for concerts.</p>
                </div>
                <div className="review-card">
                    <img src="/assets/Wonderland-2.jpg" alt="Sophie" className="review-avatar" />
                    <h4>!SOPHIE WAS HERE!</h4>
                    <p>@sophie_was_here</p>
                    <p>I love how the site is organized by vibe and fandom. It made finding the perfect pieces so easy!</p>
                </div>
                </div>
                
            </section>
        </div>

        <Footer />
        </>
        
    );
}