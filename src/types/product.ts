export type ProductCategory =
  | "HANDICRAFTS"
  | "ETHNIC_WEAR"
  | "JEWELRY"
  | "HOME_DECOR"
  | "PAINTINGS_AND_ART"
  | "ORGANIC_AND_REGIONAL_FOODS"
  | "AYURVEDA_AND_WELLNESS"
  | "HANDMADE_GIFTS"
  | "FESTIVAL_COLLECTION";

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  sku: string;
  category: ProductCategory;
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
}

export interface Product extends ProductRequest {
  id?: number;

  active?: boolean;

  createdAt?: string;

  updatedAt?: string;
}
