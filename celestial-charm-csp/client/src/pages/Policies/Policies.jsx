import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';


export default function Policies() {
    return (
        <>  

        <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
            <h1>Policies</h1>
            <p>Learn more about how we operate:</p>
            <ul style={{ marginTop: '1rem' }}>
                <li><Link to="/privacy-policy"><i className="bi bi-newspaper"></i> Terms of Service</Link></li>
                <li><Link to="/privacy-policy"><i className="bi bi-house-lock-fill"></i> Privacy Policy</Link></li>
            </ul>
        </div>
        <Footer />
        </>
        
    );
}