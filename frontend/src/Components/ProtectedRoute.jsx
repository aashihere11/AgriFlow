import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';


const ProtectedRoute = ({allowedRoles}) => {
const {user, loading} = useAuth();

    if (loading) {
     return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress size="3rem" aria-label="Loading…" sx={{ color: '#165b07' }} />
    </div>
  );
    }

    // A. Logged in nahi hai -> Login page par bhejo
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // B. Logged in hai par Role match nahi karta -> Unauthorized page par bhejo
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet /> ;
}

export default ProtectedRoute;