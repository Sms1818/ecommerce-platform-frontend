import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../api/productApi";
import AppShell from "../components/layout/AppShell";
import ProductCard from "../components/products/ProductCard";
import Alert from "../components/ui/Alert";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import type { Product } from "../types/product";
import { canManageCatalog } from "../utils/auth";

const Products = () => {
  const { user } = useAuth();
  const canManage = canManageCatalog(user?.role);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch {
      setError("Could not load products. Is the backend running on port 8080?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Remove this product from the catalog?")) return;

    setDeletingId(id);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setError("Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AppShell
      title="Marketplace catalog"
      subtitle="Browse artisan listings, manage inventory, and keep your bazaar collection up to date."
      action={
        canManage ? (
          <Link to="/products/new">
            <Button type="button" className="w-full sm:w-auto">
              Add product
            </Button>
          </Link>
        ) : undefined
      }
    >
      {error ? (
        <div className="mb-6">
          <Alert variant="error" message={error} />
        </div>
      ) : null}

      {loading ? (
        <p className="text-center text-sm text-ink-muted">Loading catalog…</p>
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ivory-dark bg-white/60 px-8 py-16 text-center">
          <p className="font-display text-xl text-ruby-deep">No products yet</p>
          <p className="mt-2 text-sm text-ink-muted">
            {canManage
              ? "Add your first listing to open the bazaar."
              : "Listings from verified sellers will appear here."}
          </p>
          {canManage ? (
            <Link to="/products/new" className="mt-6 inline-block">
              <Button type="button">Add product</Button>
            </Link>
          ) : null}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
              deletingId={deletingId}
              showManageActions={canManage}
            />
          ))}
        </div>
      )}
    </AppShell>
  );
};

export default Products;
