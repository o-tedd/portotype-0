import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { FullPageLoader } from "../ui/FullPageLoader";

export function PublicOnlyRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }

  if (user) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <Outlet />;
}
