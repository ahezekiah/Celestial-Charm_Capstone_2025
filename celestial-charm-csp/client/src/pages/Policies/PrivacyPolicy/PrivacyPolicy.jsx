import React from 'react';
import Footer from '../../../components/Footer/Footer';
import '../../../components/infoPages.css';


export default function PrivacyPolicy() {
    return (
        <>
        <div className="info-page">
            <div className="info-page-container">
                <h1>Privacy Policy</h1>
                <p>
                    At Celestial Charm, we respect your privacy. We only collect data essential to enhance your experience,
                    such as wishlist preferences and cart activity. Your data is never sold or shared with third parties.
                </p>
                <p>
                    All information is stored securely, and you have the right to request or delete your data at any time.
                    By using our site, you consent to this privacy policy. 
                </p>
                <p>
                    For questions about your data or privacy rights, contact us at <a href="mailto:contact@celestialcharm.com">contact@celestialcharm.com</a>.
                </p>
            </div>
            
        </div>
        <Footer />
        </>
        
    );
};