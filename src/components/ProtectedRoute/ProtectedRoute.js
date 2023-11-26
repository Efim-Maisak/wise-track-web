import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({children}) => {
    const { user } = useAuth();
    if(!user) {
        return <Navigate replace to="/registration"/>
    }

    return <>{children}</>
};

export default ProtectedRoute;