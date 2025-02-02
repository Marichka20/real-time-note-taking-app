import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store"; // Import typed hook

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Render the protected component if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
