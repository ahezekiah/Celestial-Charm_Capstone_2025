import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { status } = useAuth();
    if (status === "loading") return null; // or spinner
    if (status === "unauthenticated") return <Navigate to="/login" replace />;
    return children;
}
