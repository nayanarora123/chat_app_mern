import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom";

export const PrivateRouteMiddleware = ({ children }) => {

    const { currentUser } = useAuth();

    if (currentUser) {
        return children;
    }
    
    return <Navigate to="/login" />;
}