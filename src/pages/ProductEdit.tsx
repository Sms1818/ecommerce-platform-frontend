import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../api/productApi";
import AppShell from "../components/layout/AppShell";
import ProductForm from "../components/products/ProductForm";
import Alert from "../components/ui/Alert";
import { useProductForm } from "../hooks/useProductForm";
import type { ProductRequest } from "../types/product";

const toRequest = (product: {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  sku: string;
  category: ProductRequest["category"];
  subCategory: string;
  brand: string;
  artisanName: string;
  originState: string;
  material: string;
  dimensions: string;
  weightInKg: number;
  handmade: boolean;
  festivalTag: string;
  imageUrl: string;
}): ProductRequest => ({
  name: product.name,
  description: product.description,
  price: Number(product.price),
  stockQuantity: product.stockQuantity,
  sku: product.sku,
  category: product.category,
  subCategory: product.subCategory,
  brand: product.brand,
  artisanName: product.artisanName,
  originState: product.originState,
  material: product.material,
  dimensions: product.dimensions,
  weightInKg: product.weightInKg ?? 0,
  handmade: product.handmade ?? false,
  festivalTag: product.festivalTag,
  imageUrl: product.imageUrl,
});

const ProductEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { formData, handleChange, setForm } = useProductForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      setFetching(true);
      try {
        const product = await getProductById(Number(id));
        setForm(toRequest(product));
      } catch {
        setError("Could not load product for editing.");
      } finally {
        setFetching(false);
      }
    };

    load();
  }, [id, setForm]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      await updateProduct(Number(id), formData);
      navigate(`/products/${id}`);
    } catch {
      setError("Could not update product. Check all fields and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AppShell title="Edit product">
        <p className="text-sm text-ink-muted">Loading…</p>
      </AppShell>
    );
  }

  return (
    <AppShell
      title="Edit product"
      subtitle="Update listing details for your catalog."
      action={
        <Link
          to={`/products/${id}`}
          className="text-sm font-semibold text-saffron-deep hover:text-marigold"
        >
          ← Cancel
        </Link>
      }
    >
      {error ? (
        <div className="mb-6">
          <Alert variant="error" message={error} />
        </div>
      ) : null}

      <ProductForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Save changes"
        loadingLabel="Saving…"
      />
    </AppShell>
  );
};

export default ProductEdit;
