import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";


const ProtectedRoute = () => {
    const [authenticated, setAuthenticated] = useState("false");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get("http://localhost:3000/me", {
            withCredentials: true,
        })
            .then(() => {
                setAuthenticated(true);
            })
            .catch(() => {
                setAuthenticated(false);
            }).finally(() => {
                setLoading(false);
            })
    }, [])

    if (loading) {
        return <p>Loading...</p>;
    }

    return authenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;