// import { Navigate, useLocation } from 'react-router-dom';
// import { useUser } from '../context/UserContext';


// export default function ProctectedRoute({ children }){
//     const { isLoggedIn, loading } = useUser();
//     const location = useLocation();

//     if (loading) return <div className='text-center p-6'>Checking session...</div>;
    
//     if (!isLoggedIn) return <Navigate to="/" state={{ from: location }} replace />;

//     return children;
// }
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return null;               // or a spinner
    if (!user) return <Navigate to="/" replace />;
    return children;
}
