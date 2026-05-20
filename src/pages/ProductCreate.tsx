import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createProduct } from "../api/productApi";
import AppShell from "../components/layout/AppShell";
import ProductForm from "../components/products/ProductForm";
import Alert from "../components/ui/Alert";
import { useProductForm } from "../hooks/useProductForm";

const ProductCreate = () => {
  const navigate = useNavigate();
  const { formData, handleChange } = useProductForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const created = await createProduct(formData);
      navigate(`/products/${created.id}`);
    } catch {
      setError("Could not create product. Check all fields and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell
      title="Add a product"
      subtitle="List a new treasure in the Bazaar Bharat catalog."
      action={
        <Link
          to="/products"
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
        submitLabel="Create product"
        loadingLabel="Creating…"
      />
    </AppShell>
  );
};

export default ProductCreate;
