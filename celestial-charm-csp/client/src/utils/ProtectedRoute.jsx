import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ProctectedRoute({ children }){
    const { isLoggedIn } = useUser();
    const location = useLocation();

    if(!isLoggedIn) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
}