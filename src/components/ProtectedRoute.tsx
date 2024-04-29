import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { routesConfig } from "../routes";

type ProtectedRouteProps = {
  allowedRoles?: string[];
  children?: JSX.Element;
};

export const ProtectedRoute = ({ allowedRoles = [], children }: ProtectedRouteProps) => {
  const { user } = useAuthContext();
  const userRole = user?.role ?? "guest";

  if (allowedRoles.length && !allowedRoles.includes(userRole)) {
    if (userRole === "user" || userRole === "guest") {
      return <Navigate to={routesConfig.home} replace />;
    }
    if (userRole === "admin") {
      return <Navigate to={routesConfig.dashboard} replace />;
    }
  }

  return children ? children : <Outlet />;
};
