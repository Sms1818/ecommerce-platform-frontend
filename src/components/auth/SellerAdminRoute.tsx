import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { canManageCatalog } from "../../utils/auth";

/**
 * Requires a signed-in user with SELLER or ADMIN role (catalog mutations).
 */
const SellerAdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-ink-muted">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!canManageCatalog(user.role)) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
};

export default SellerAdminRoute;
