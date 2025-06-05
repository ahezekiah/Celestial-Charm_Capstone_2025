import React from 'react';
import Footer from '../../../components/Footer/Footer';


export default function PrivacyPolicy() {
    return (
        <>
        <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
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
        <Footer />
        </>
    );
};