import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    console.log("isLoading:", isLoading);
    console.log("isAuthenticated:", isAuthenticated);

    if (isLoading) {
        return <div>Loading...</div>; // Show a loading indicator while checking authentication
    }
    if (isAuthenticated) {
        return <Outlet />;
    }
    return <Navigate to="/" replace />;
};

export default ProtectedRoute;