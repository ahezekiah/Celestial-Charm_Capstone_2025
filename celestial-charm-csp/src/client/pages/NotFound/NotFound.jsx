import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
    return (
        <div className="notfound-container">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-message">
            The page you are looking for doesn't exist or has been moved. Please go back to the homepage.
        </p>
        <Link to="/" className="notfound-button">Go back home</Link>
        </div>
    );
}
