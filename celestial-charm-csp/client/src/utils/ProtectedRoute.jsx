import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ProctectedRoute({ children }){
    const { isLoggedIn } = useUser();
    return isLoggedIn ? children : <Navigate to={'/login'}/>;
}