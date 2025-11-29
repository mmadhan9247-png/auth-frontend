import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api";

const PrivateRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/me");
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (checking) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
