import React from "react";
import Navbar3 from '../NavBars/Navbar3';
import Footer from '../Footer';

export default function Dashboard() {
    return (
        <div className="dashboard-wrapper">
            <Navbar3 />
            <main className="dashboard-content">
                <div className="grid-layout">
                    {/* Row 1 */}
                    <div className="dashboard-card">
                        <img src="/assets/fashion.jpg" alt='Fashion'/>
                        <h3>Fashion</h3>
                        <p>Explore the latest trends in fashion.</p>
                    </div>
                    <div className="dashboard-card">
                        <img src="/assets/jewelry.jpg" alt="Jewelry" />
                        <h3>Jewelry</h3>
                        <p>Discover exquisite jewelry pieces.</p>
                    </div>
                    {/* Row 2 */}
                    <div className="dashboard-card">
                        <img src="/assets/fragrances.jpg" alt="Fragrances" />
                        <h3>Fragrance</h3>
                        <p>Find your signature scent.</p>
                    </div>
                    <div className="dashboard-card">
                        <img src="/assets/anime.jpg" alt="Anime" />
                        <h3>Anime</h3>
                        <p>Explore the world of anime-inspired products.</p>
                    </div>
                    {/* Row 3 */}
                    <div className="dashboard-card">
                        <img src="/assets/kpop.jpg" alt="Kpop" />
                        <h3>Kpop</h3>
                        <p>Stay updated with the latest Kpop trends.</p>
                    </div>
                    <div className="dashboard-card">
                        <img src="/assets/fantasy.jpg" alt="Fantasy" />
                        <h3>Fantasy</h3>
                        <p>Dive into the realm of fantasy.</p>
                    </div>
                    {/* Row 4 */}
                    <div className="dashboard-card">
                        <img src="/assets/romance.jpg" alt="Romance" />
                        <h3>Romance</h3>
                        <p>Explore romantic products and gifts.</p>
                    </div>
                    <div className="dashboard-card">
                        <img src="/assets/quiz.jpg" alt="Quiz" />
                        <h3>Quiz</h3>
                        <p>Test your knowledge with fun quizzes.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}