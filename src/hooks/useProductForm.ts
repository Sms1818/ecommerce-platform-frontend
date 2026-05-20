import { useState } from "react";
import type { ProductRequest } from "../types/product";
import { emptyProductRequest } from "../utils/product";

const numericFields = new Set([
  "price",
  "stockQuantity",
  "weightInKg",
]);

export const useProductForm = (initial?: ProductRequest) => {
  const [formData, setFormData] = useState<ProductRequest>(
    initial ?? emptyProductRequest(),
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.has(name) ? Number(value) : value,
    }));
  };

  const setForm = setFormData;

  return { formData, handleChange, setForm };
};
