import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/productApi";
import CustomerDashboardContent from "../components/dashboard/CustomerDashboardContent";
import SellerAdminDashboardContent from "../components/dashboard/SellerAdminDashboardContent";
import AppShell from "../components/layout/AppShell";
import Button from "../components/ui/Button";
import Panel from "../components/ui/Panel";
import { useAuth } from "../context/AuthContext";
import type { Product } from "../types/product";
import {
  roleLabel,
  userDisplayName,
  userInitials,
  type UserRole,
} from "../utils/auth";

const Dashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch {
      setError("Could not load marketplace data. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (!user) return null;

  const role = user.role as UserRole;
  const name = userDisplayName(user);

  const isSellerOrAdmin = role === "SELLER" || role === "ADMIN";

  let primaryAction: ReactNode;
  if (role === "SELLER") {
    primaryAction = (
      <Link to="/products/new">
        <Button type="button" className="w-full sm:w-auto">
          Add listing
        </Button>
      </Link>
    );
  } else if (role === "ADMIN") {
    primaryAction = (
      <Link to="/products">
        <Button type="button" className="w-full sm:w-auto">
          Manage catalog
        </Button>
      </Link>
    );
  } else {
    primaryAction = (
      <Link to="/products">
        <Button type="button" className="w-full sm:w-auto">
          Explore marketplace
        </Button>
      </Link>
    );
  }

  let subtitle: string;
  if (role === "ADMIN") {
    subtitle =
      "Admin hub — full catalog snapshot, recent listings, and management shortcuts.";
  } else if (role === "SELLER") {
    subtitle =
      "Seller hub — catalog health, recent activity, and quick actions.";
  } else {
    subtitle =
      "Your home — discover makers and treasures from across India.";
  }

  const profileNote = isSellerOrAdmin
    ? "Profile editing is coming soon. Manage listings from the catalog or add new products."
    : "Profile editing is coming soon. Browse the marketplace to discover handcrafted goods.";

  return (
    <AppShell
      title={`Namaste, ${name}`}
      subtitle={subtitle}
      action={primaryAction}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-1">
          <div className="flex items-start gap-4">
            {user.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt=""
                className="h-16 w-16 shrink-0 rounded-full border-2 border-saffron/30 object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-saffron to-marigold font-display text-xl font-semibold text-white">
                {userInitials(user)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-semibold text-ruby-deep">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-ink-muted">@{user.username}</p>
              <span className="mt-2 inline-block rounded-full bg-teal/10 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-teal uppercase">
                {roleLabel(role)}
              </span>
            </div>
          </div>

          <dl className="mt-6 space-y-3 text-sm">
            <div>
              <dt className="text-ink-muted">Email</dt>
              <dd className="truncate font-medium text-ruby-deep">{user.email}</dd>
            </div>
            {user.phoneNumber ? (
              <div>
                <dt className="text-ink-muted">Phone</dt>
                <dd className="font-medium text-ruby-deep">{user.phoneNumber}</dd>
              </div>
            ) : null}
          </dl>

          <p className="mt-6 text-xs text-ink-muted">{profileNote}</p>
        </Panel>

        {isSellerOrAdmin ? (
          <SellerAdminDashboardContent
            role={role}
            products={products}
            loading={loading}
            error={error}
          />
        ) : (
          <CustomerDashboardContent
            products={products}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </AppShell>
  );
};

export default Dashboard;
