import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type ProtectedRouteProps = {
  allowedRoles?: string[];
  children?: JSX.Element;
};

export const ProtectedRoute = ({ allowedRoles = [], children }: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext);
  const userRole = user?.role ?? "guest";

  if (allowedRoles.length && !allowedRoles.includes(userRole)) {
    if (userRole === "user" || userRole === "guest") {
      return <Navigate to="/" replace />;
    }
    if (userRole === "admin") {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children ? children : <Outlet />;
};
