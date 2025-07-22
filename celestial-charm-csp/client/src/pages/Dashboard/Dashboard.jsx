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
                    <div className="dashboard-card">
                        <Link to='/fragrances'><img src="/assets/fragrances.jpg" alt="Fragrances" /><h3>Fragrances</h3></Link>
                        <p>Find your signature scent.</p>
                    </div>
                    {/* Row 3 */}
                    <div className="dashboard-card">
                        <Link to='/books'><img src="/assets/fantasy.jpg" alt="Books" /><h3>Books</h3></Link>
                        <p>Dive into the realm of of everything and anything romance, fantasy, mystery, and more!</p>
                    </div>
                    <div className="dashboard-card">
                        <Link to='/romance'><img src="/assets/spotify.jpg" alt="Spotify" /><h3>Spotify</h3></Link>
                        <p>Add some music to your Spotify playlist here!</p>
                    </div>
                    {/* Row 4 */}
                    <div className="dashboard-card">
                        <Link to='/knowledge'><img src="/assets/quiz.jpg" alt="Knowledge Quiz" /><h3>Knowledge Quiz</h3></Link>
                        <p>Test your knowledge with this fun quiz.</p>
                    </div>
                    <div className="dashboard-card">
                        <Link to='/personality'><img src="/assets/personality.jpg" alt="Perosnality Quiz" /><h3>Personality Quiz</h3></Link>
                        <p>Don't know what K-pop or anime personality you have? Take the quiz here!</p>
                    </div>
                    
                </div>
            </main>
            <Footer />
        </div>
    );
}