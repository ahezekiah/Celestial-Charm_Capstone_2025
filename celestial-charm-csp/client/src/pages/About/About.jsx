import React from 'react';
import Footer from '../../components/Footer/Footer';
import '../../components/infoPages.css';


export default function About() {
    return (
        <>
        <div className='info-page'>
            <div className="info-page-container">
            <h1>About Us</h1>
            <p>
                Celestial Charm is a curated wonderland for K-pop fans, Anime enthusiast and book lovers alike. 
                Our mission is to connect passionate fans with magical products, top-tier books, 
                and personalized experiences in fashion, beauty, fantasy, and etc.. 
                Whether you're exploring a dreamy collection, building your wishlist, or diving into new stories — 
                this site was made to charm your world <i className="bi bi-stars"></i>.
            </p>
        </div>
        </div>
        <Footer />
        </>
    );
};