import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteProduct, getProductById } from "../api/productApi";
import AppShell from "../components/layout/AppShell";
import Alert from "../components/ui/Alert";
import Button from "../components/ui/Button";
import Panel from "../components/ui/Panel";
import { useAuth } from "../context/AuthContext";
import type { Product } from "../types/product";
import { categoryLabel, formatPrice } from "../utils/product";
import { canManageCatalog } from "../utils/auth";

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="border-b border-ivory-dark/60 py-3 last:border-0">
    <dt className="text-[10px] font-semibold tracking-wide text-ruby-deep/70 uppercase">
      {label}
    </dt>
    <dd className="mt-1 text-sm text-ink">{value || "—"}</dd>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const canManage = canManageCatalog(user?.role);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch {
        setError("Product not found or could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleDelete = async () => {
    if (!product?.id || !window.confirm("Remove this product permanently?")) {
      return;
    }

    setDeleting(true);
    try {
      await deleteProduct(product.id);
      navigate("/products");
    } catch {
      setError("Failed to delete product.");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <AppShell title="Product details">
        <p className="text-sm text-ink-muted">Loading…</p>
      </AppShell>
    );
  }

  if (error || !product) {
    return (
      <AppShell title="Product details">
        <Alert variant="error" message={error ?? "Product not found."} />
        <Link to="/products" className="mt-4 inline-block text-sm font-semibold text-saffron-deep hover:text-marigold">
          ← Back to catalog
        </Link>
      </AppShell>
    );
  }

  return (
    <AppShell
      title={product.name}
      subtitle={categoryLabel(product.category)}
      action={
        canManage ? (
          <div className="flex flex-wrap gap-2">
            <Link to={`/products/${product.id}/edit`}>
              <Button type="button" variant="secondary">
                Edit
              </Button>
            </Link>
            <Button
              type="button"
              variant="danger"
              loading={deleting}
              onClick={handleDelete}
            >
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </div>
        ) : undefined
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <Panel className="p-0! overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="aspect-4/3 w-full object-cover"
            />
          ) : (
            <div className="flex aspect-4/3 items-center justify-center bg-ivory-warm">
              <span className="font-display text-6xl text-marigold/30">✦</span>
            </div>
          )}
        </Panel>

        <Panel>
          <p className="font-display text-3xl font-semibold text-saffron-deep">
            {formatPrice(Number(product.price))}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            {product.description}
          </p>

          <dl className="mt-6">
            <DetailRow label="SKU" value={product.sku} />
            <DetailRow
              label="Stock"
              value={
                product.stockQuantity > 0
                  ? `${product.stockQuantity} available`
                  : "Out of stock"
              }
            />
            <DetailRow label="Brand" value={product.brand} />
            <DetailRow label="Sub-category" value={product.subCategory} />
            <DetailRow label="Artisan" value={product.artisanName} />
            <DetailRow label="Origin" value={product.originState} />
            <DetailRow label="Material" value={product.material} />
            <DetailRow label="Dimensions" value={product.dimensions} />
            <DetailRow
              label="Weight"
              value={product.weightInKg ? `${product.weightInKg} kg` : null}
            />
            <DetailRow
              label="Handmade"
              value={product.handmade ? "Yes" : "No"}
            />
            <DetailRow label="Festival tag" value={product.festivalTag} />
            <DetailRow
              label="Status"
              value={product.active === false ? "Inactive" : "Active"}
            />
          </dl>

          <Link
            to="/products"
            className="mt-6 inline-block text-sm font-semibold text-saffron-deep hover:text-marigold"
          >
            ← Back to catalog
          </Link>
        </Panel>
      </div>
    </AppShell>
  );
};

export default ProductDetail;
