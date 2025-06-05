import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import '../../components/infoPages.css'; // Assuming you have a CSS file for styling


export default function Policies() {
    return (
        <>  
        <div className='info-page'>
            <div className="info-page-container">
            <h1>Policies</h1>
            <p>Learn more about how we operate:</p>
            <ul>
                <li><Link to="/terms-of-service"><i className="bi bi-newspaper"></i> Terms of Service</Link></li>
                <li><Link to="/privacy-policy"><i className="bi bi-house-lock-fill"></i> Privacy Policy</Link></li>
            </ul>
        </div>
        </div>
        <Footer />
        </>
    );
    
}