import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Panel from "../ui/Panel";
import Alert from "../ui/Alert";
import type { Product } from "../../types/product";
import type { UserRole } from "../../utils/auth";
import { categoryLabel, formatPrice } from "../../utils/product";

const LOW_STOCK_THRESHOLD = 5;
const RECENT_LIMIT = 5;

type MarketplaceStats = {
  total: number;
  lowStock: number;
  categories: number;
  inactive: number;
};

const computeStats = (products: Product[]): MarketplaceStats => {
  const categories = new Set(products.map((p) => p.category));
  return {
    total: products.length,
    lowStock: products.filter(
      (p) => (p.stockQuantity ?? 0) < LOW_STOCK_THRESHOLD,
    ).length,
    categories: categories.size,
    inactive: products.filter((p) => p.active === false).length,
  };
};

const sortByNewest = (products: Product[]): Product[] =>
  [...products].sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bTime - aTime;
  });

type SellerAdminDashboardContentProps = {
  role: UserRole;
  products: Product[];
  loading: boolean;
  error: string | null;
};

const SellerAdminDashboardContent = ({
  role,
  products,
  loading,
  error,
}: SellerAdminDashboardContentProps) => {
  const stats = computeStats(products);
  const recentProducts = sortByNewest(products).slice(0, RECENT_LIMIT);

  const snapshotTitle =
    role === "ADMIN" ? "Catalog snapshot" : "Marketplace snapshot";
  const snapshotBlurb =
    role === "ADMIN"
      ? "Full-catalog health — listings are not filtered by seller until seller ownership is modeled in the API."
      : "Platform-wide catalog health — when products are linked to sellers, this will focus on your listings.";

  let recentListingsBlock: ReactNode;
  if (loading) {
    recentListingsBlock = (
      <p className="text-sm text-ink-muted">Loading listings…</p>
    );
  } else if (recentProducts.length === 0) {
    recentListingsBlock = (
      <Panel>
        <p className="text-center text-sm text-ink-muted">
          No products in the catalog yet.{" "}
          <Link
            to="/products/new"
            className="font-medium text-saffron-deep hover:underline"
          >
            Add the first listing
          </Link>
        </p>
      </Panel>
    );
  } else {
    recentListingsBlock = (
      <ul className="divide-y divide-ivory-dark overflow-hidden rounded-2xl border border-ivory-dark bg-white/85">
        {recentProducts.map((product) => {
          const stockSuffix =
            typeof product.stockQuantity === "number"
              ? ` · ${product.stockQuantity} in stock`
              : "";
          return (
            <li key={product.id}>
              <Link
                to={`/products/${product.id}`}
                className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-ivory-warm/60"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-ruby-deep">
                    {product.name}
                  </p>
                  <p className="text-xs text-ink-muted">
                    {categoryLabel(product.category)}
                    {stockSuffix}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-saffron-deep">
                  {formatPrice(product.price)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="space-y-6 lg:col-span-2">
      {error ? (
        <div className="mb-2">
          <Alert variant="error" message={error} />
        </div>
      ) : null}

      <section>
        <h2 className="mb-1 font-display text-xl font-semibold text-ruby-deep">
          {snapshotTitle}
        </h2>
        <p className="mb-4 text-sm text-ink-muted">{snapshotBlurb}</p>

        {loading ? (
          <p className="text-sm text-ink-muted">Loading snapshot…</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard label="Total listings" value={stats.total} />
            <StatCard label="Low stock" value={stats.lowStock} />
            <StatCard label="Categories" value={stats.categories} />
            <StatCard label="Inactive" value={stats.inactive} />
          </div>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-ruby-deep">
              Recent listings
            </h2>
            <p className="text-sm text-ink-muted">
              Newest products across the marketplace
            </p>
          </div>
          <Link
            to="/products"
            className="shrink-0 text-sm font-medium text-saffron-deep hover:text-ruby-deep"
          >
            View all
          </Link>
        </div>

        {recentListingsBlock}
      </section>

      <section className="flex flex-wrap gap-3">
        <Link to="/products">
          <Button type="button" variant="secondary">
            Browse catalog
          </Button>
        </Link>
        <Link to="/products/new">
          <Button type="button" variant="secondary">
            Add product
          </Button>
        </Link>
      </section>
    </div>
  );
};

type StatCardProps = {
  label: string;
  value: number;
};

const StatCard = ({ label, value }: StatCardProps) => (
  <div className="rounded-xl border border-ivory-dark bg-ivory-warm/40 px-4 py-3">
    <p className="text-xs font-medium tracking-wide text-ink-muted uppercase">
      {label}
    </p>
    <p className="mt-1 font-display text-2xl font-semibold text-ruby-deep">
      {value}
    </p>
  </div>
);

export default SellerAdminDashboardContent;
