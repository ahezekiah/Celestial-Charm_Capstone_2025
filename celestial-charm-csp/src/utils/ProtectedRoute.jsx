import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

export default function ProctectedRoute({ children }){
    const [user, loading, error] = useAuthState(auth);

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (error) return <div>Error: {error.message}</div>;

    return children;
}