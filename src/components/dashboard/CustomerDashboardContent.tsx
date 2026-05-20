import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Panel from "../ui/Panel";
import Alert from "../ui/Alert";
import type { Product } from "../../types/product";
import { categoryLabel, formatPrice } from "../../utils/product";

type CustomerDashboardContentProps = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

const NEW_ARRIVALS_LIMIT = 5;

const sortByNewest = (products: Product[]): Product[] =>
  [...products].sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bTime - aTime;
  });

const CustomerDashboardContent = ({
  products,
  loading,
  error,
}: CustomerDashboardContentProps) => {
  const newArrivals = sortByNewest(products).slice(0, NEW_ARRIVALS_LIMIT);

  let arrivalsBlock: ReactNode;
  if (loading) {
    arrivalsBlock = <p className="text-sm text-ink-muted">Loading picks…</p>;
  } else if (newArrivals.length === 0) {
    arrivalsBlock = (
      <Panel>
        <p className="text-center text-sm text-ink-muted">
          Nothing listed yet. Check back soon as sellers join the bazaar.
        </p>
      </Panel>
    );
  } else {
    arrivalsBlock = (
      <ul className="divide-y divide-ivory-dark overflow-hidden rounded-2xl border border-ivory-dark bg-white/85">
        {newArrivals.map((product) => (
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
                </p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-saffron-deep">
                {formatPrice(product.price)}
              </span>
            </Link>
          </li>
        ))}
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
          Discover the bazaar
        </h2>
        <p className="mb-4 text-sm text-ink-muted">
          Explore curated crafts, regional specialties, and festival finds from
          independent makers.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/products">
            <Button type="button">Browse all products</Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Panel>
          <h3 className="font-display text-lg font-semibold text-ruby-deep">
            Your orders
          </h3>
          <p className="mt-2 text-sm text-ink-muted">
            Order history and tracking will appear here once checkout is
            connected.
          </p>
        </Panel>
        <Panel>
          <h3 className="font-display text-lg font-semibold text-ruby-deep">
            Saved for later
          </h3>
          <p className="mt-2 text-sm text-ink-muted">
            Wishlists and saved sellers are on the roadmap — for now, use your
            browser bookmarks or revisit the catalog anytime.
          </p>
        </Panel>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-ruby-deep">
              New arrivals
            </h2>
            <p className="text-sm text-ink-muted">
              Fresh listings across the marketplace
            </p>
          </div>
          <Link
            to="/products"
            className="shrink-0 text-sm font-medium text-saffron-deep hover:text-ruby-deep"
          >
            See full catalog
          </Link>
        </div>

        {arrivalsBlock}
      </section>
    </div>
  );
};

export default CustomerDashboardContent;
