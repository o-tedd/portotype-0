import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { FullPageLoader } from "../ui/FullPageLoader";

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
