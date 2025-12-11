// Product types for Pride Electrical catalog

export interface BaseProduct {
  catalog_no: string;
  price_inr: number;
  std_pkg?: number;
}

export interface LugProduct extends BaseProduct {
  size_sq_mm: number;
  hole_size_mm?: number | null;
}

export interface ToolProduct extends BaseProduct {
  model?: string;
  description?: string;
  range_sq_mm?: string;
}

export interface CableGlandProduct {
  suitable_od_mm: string;
  nipple_thread: string;
  weather_proof?: { catalog_no: string; price_inr: number; box_pkg: number };
  flame_proof?: { catalog_no: string; price_inr: number; box_pkg: number };
}

export interface ProductCategory {
  category: string;
  category_id: string;
  description: string;
  material?: string;
  type?: string;
  series?: string;
  finish?: string;
  manufacturing?: string;
  variants?: string[];
  products?: LugProduct[];
  // For categorized products (ring terminals, tools, etc.)
  [key: string]: unknown;
}

export interface CatalogMetadata {
  catalog_info: {
    brand: string;
    parent_company: string;
    catalog_version: string;
    effective_date: string;
    currency: string;
    price_type: string;
    note: string;
  };
  categories: Array<{
    id: string;
    name: string;
    description: string;
    subcategories?: string[];
  }>;
  size_formats: {
    normalized: string;
    variations: string[];
  };
  hole_size_standards: Record<string, string>;
}

// Normalized product for display
export interface NormalizedProduct {
  id: string;
  catalog_no: string;
  name: string;
  category: string;
  categoryId: string;
  subcategory?: string;
  material?: string;
  type?: string;
  series?: string;
  size_sq_mm?: number;
  hole_size_mm?: number | null;
  price_inr: number;
  std_pkg?: number;
  description?: string;
  specifications: Record<string, string | number | null | undefined>;
}

// Category for navigation
export interface ProductCategoryNav {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  subcategories?: string[];
}

// Filters
export interface ProductFilters {
  category?: string;
  material?: string;
  size?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
