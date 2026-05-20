import type { ProductCategory, ProductRequest } from "../types/product";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "HANDICRAFTS",
  "ETHNIC_WEAR",
  "JEWELRY",
  "HOME_DECOR",
  "PAINTINGS_AND_ART",
  "ORGANIC_AND_REGIONAL_FOODS",
  "AYURVEDA_AND_WELLNESS",
  "HANDMADE_GIFTS",
  "FESTIVAL_COLLECTION",
];

export const categoryLabel = (category: ProductCategory): string =>
  category
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export const emptyProductRequest = (): ProductRequest => ({
  name: "",
  description: "",
  price: 0,
  stockQuantity: 0,
  sku: "",
  category: "HANDICRAFTS",
  subCategory: "",
  brand: "",
  artisanName: "",
  originState: "",
  material: "",
  dimensions: "",
  weightInKg: 0,
  handmade: true,
  festivalTag: "",
  imageUrl: "",
});
