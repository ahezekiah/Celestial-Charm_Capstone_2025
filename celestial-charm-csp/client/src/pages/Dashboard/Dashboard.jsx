import React from "react";
import Navbar3 from '../../components/NavBars/Navbar3';
import Footer from '../../components/Footer/Footer';
import './Dashboard.css';
import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="dashboard-wrapper">
            <Navbar3 />
            <main className="dashboard-content">
                <div className="grid-layout">
                    {/* Row 1 */}
                    <div className="dashboard-card">
                        <Link to='/kpop2'><img src="/assets/kpop.jpg" alt="Kpop" /><h3>Kpop</h3></Link>
                        <p>Stay updated with the latest Kpop trends.</p>
                    </div>
                    <div className="dashboard-card">
                        <Link to='/anime2'><img src="/assets/anime.jpg" alt="Anime" /><h3>Anime</h3></Link>
                        <p>Explore the world of anime-inspired products.</p>
                    </div>
                    
                    
                    {/* Row 2 */}
                    <div className="dashboard-card">
                        <Link to='/fashion'><img src="/assets/fashion.jpg" alt='Fashion'/><h3>Fashion</h3></Link>
                        <p>Explore the latest trends in fashion.</p>
                    </div>
                    {/* <div className="dashboard-card">
                        <Link to='/jewelry'><img src="/assets/jewelry.jpg" alt="Jewelry" /><h3>Jewelry</h3></Link>
                        <p>Discover exquisite jewelry pieces.</p>
                    </div> */}
                    <div className="dashboard-card">
                        <Link to='/fragrances'><img src="/assets/fragrances.jpg" alt="Fragrances" /><h3>Fragrances</h3></Link>
                        <p>Find your signature scent.</p>
                    </div>
                    {/* Row 3 */}
                    <div className="dashboard-card">
                        <Link to='/fantasy'><img src="/assets/fantasy.jpg" alt="Fantasy" /><h3>Fantasy</h3></Link>
                        <p>Dive into the realm of fantasy.</p>
                    </div>
                    <div className="dashboard-card">
                        <Link to='/romance'><img src="/assets/romance.jpg" alt="Romance" /><h3>Romance</h3></Link>
                        <p>Explore romantic products and gifts.</p>
                    </div>
                    {/* Row 4 */}
                    <div className="dashboard-card">
                        <Link to='/quiz'><img src="/assets/quiz.jpg" alt="Quiz" /><h3>Quiz</h3></Link>
                        <p>Test your knowledge with fun quizzes.</p>
                    </div>
                    <div className="dashboard-card">
                        <Link to='/wishlist'><img src="/assets/wishlist2.jpg" alt="Wishlists" /><h3>Wishlist</h3></Link>
                        <p>Create and manage your wishlists.</p>
                    </div>
                    
                </div>
            </main>
            <Footer />
        </div>
    );
}