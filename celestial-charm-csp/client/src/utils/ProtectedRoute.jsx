import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useEffect, useState } from 'react';

export default function ProctectedRoute({ children }){
    const { isLoggedIn, setUser } = useUser();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            setAuthorized(false);
            setLoading(false);
            return;
        }

        fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}`}
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.user) {
                    setUser(data.user);
                    setAuthorized(true);
                } else {
                    setAuthorized(false);
                }
            })
            .catch(() => setAuthorized(false))
            .finally(() => setLoading(false));
    }, [setUser]);

    if (loading) return <div className='text-center p-6'>Checking session...</div>;
    
    return authorized || isLoggedIn 
    ? children 
    : <Navigate to="/" state={{ from: location }} replace />;
}