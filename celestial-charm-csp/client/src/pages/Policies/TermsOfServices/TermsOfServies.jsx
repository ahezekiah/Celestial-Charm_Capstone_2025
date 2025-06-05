import React from 'react';
import Footer from '../../../components/Footer/Footer';


export default function TermsOfServices() {
    return (
        <>

        <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
            <h1>Terms of Service</h1>
            <p>
                By using Celestial Charm, you agree to comply with our rules and policies. 
                All content provided is for informational and entertainment purposes only. 
                We reserve the right to change or discontinue any part of the service at any time without notice.
            </p>
            <p>
                Users may not reproduce, redistribute, or exploit content from this site without written permission. 
                We are not liable for any loss or damage arising from the use of our site.
            </p>
            <p>
                Your use of this site signifies your acceptance of these terms. 
                For questions, please contact us at <a href="mailto:contact@celestialcharm.com">contact@celestialcharm.com</a>.
            </p>
        </div>
        <Footer />
        </>
    );
};