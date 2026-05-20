import Field, { labelClassName } from "../ui/Field";
import Button from "../ui/Button";
import Panel from "../ui/Panel";
import type { ProductRequest } from "../../types/product";
import { PRODUCT_CATEGORIES, categoryLabel } from "../../utils/product";

type ProductFormProps = {
  formData: ProductRequest;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  submitLabel: string;
  loadingLabel: string;
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-4 font-display text-lg font-semibold text-ruby-deep">
    {children}
  </h3>
);

const ProductForm = ({
  formData,
  onChange,
  onSubmit,
  loading,
  submitLabel,
  loadingLabel,
}: ProductFormProps) => {
  return (
    <Panel>
      <form onSubmit={onSubmit} className="space-y-8">
        <section>
          <SectionTitle>Basics</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field
                label="Product name"
                name="name"
                placeholder="Hand-painted terracotta lamp"
                value={formData.name}
                onChange={onChange}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <Field
                label="Description"
                name="description"
                as="textarea"
                placeholder="Tell the story behind this piece…"
                value={formData.description}
                onChange={onChange}
                required
              />
            </div>
            <Field
              label="Category"
              name="category"
              as="select"
              value={formData.category}
              onChange={onChange}
              required
            >
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {categoryLabel(cat)}
                </option>
              ))}
            </Field>
            <Field
              label="Sub-category"
              name="subCategory"
              placeholder="Table lamps"
              value={formData.subCategory}
              onChange={onChange}
            />
            <Field
              label="Brand"
              name="brand"
              placeholder="Artisan collective"
              value={formData.brand}
              onChange={onChange}
            />
            <Field
              label="SKU"
              name="sku"
              placeholder="BB-HC-001"
              value={formData.sku}
              onChange={onChange}
              required
            />
          </div>
        </section>

        <section>
          <SectionTitle>Inventory & pricing</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Price (INR)"
              name="price"
              type="number"
              min={0}
              step="0.01"
              value={formData.price}
              onChange={onChange}
              required
            />
            <Field
              label="Stock quantity"
              name="stockQuantity"
              type="number"
              min={0}
              value={formData.stockQuantity}
              onChange={onChange}
              required
            />
          </div>
        </section>

        <section>
          <SectionTitle>Artisan & origin</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Artisan name"
              name="artisanName"
              placeholder="Lakshmi Devi"
              value={formData.artisanName}
              onChange={onChange}
            />
            <Field
              label="Origin state"
              name="originState"
              placeholder="Rajasthan"
              value={formData.originState}
              onChange={onChange}
            />
            <Field
              label="Festival tag"
              name="festivalTag"
              placeholder="Diwali, Holi…"
              value={formData.festivalTag}
              onChange={onChange}
            />
          </div>
        </section>

        <section>
          <SectionTitle>Physical details</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Material"
              name="material"
              placeholder="Terracotta, brass…"
              value={formData.material}
              onChange={onChange}
            />
            <Field
              label="Dimensions"
              name="dimensions"
              placeholder="30 × 20 × 15 cm"
              value={formData.dimensions}
              onChange={onChange}
            />
            <Field
              label="Weight (kg)"
              name="weightInKg"
              type="number"
              min={0}
              step="0.01"
              value={formData.weightInKg}
              onChange={onChange}
            />
            <div>
              <span className={labelClassName}>Handmade</span>
              <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border border-ivory-dark bg-ivory-warm/60 px-4 py-3">
                <input
                  type="checkbox"
                  name="handmade"
                  checked={formData.handmade}
                  onChange={onChange}
                  className="h-4 w-4 rounded border-ivory-dark text-saffron focus:ring-saffron/30"
                />
                <span className="text-sm text-ink">Crafted by hand</span>
              </label>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle>Media</SectionTitle>
          <Field
            label="Image URL"
            name="imageUrl"
            placeholder="https://…"
            value={formData.imageUrl}
            onChange={onChange}
          />
          {formData.imageUrl ? (
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="mt-4 max-h-48 rounded-xl border border-ivory-dark object-cover"
            />
          ) : null}
        </section>

        <Button loading={loading} className="w-full sm:w-auto">
          {loading ? loadingLabel : submitLabel}
        </Button>
      </form>
    </Panel>
  );
};

export default ProductForm;
