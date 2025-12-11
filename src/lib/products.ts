import { NormalizedProduct, ProductCategoryNav, CatalogMetadata } from './types';

// Import all product data
import catalogMetadata from '@/data/catalog-metadata.json';
import copperTubeTerminalsMediumDuty from '@/data/products/copper-tube-terminals-medium-duty.json';
import copperTubeTerminalsHeavyDutyBS4579 from '@/data/products/copper-tube-terminals-heavy-duty-bs4579.json';
import copperTubeTerminalsHeavyDutyLongBarrel from '@/data/products/copper-tube-terminals-heavy-duty-long-barrel.json';
import copperSectorLugsLongBarrel from '@/data/products/copper-sector-lugs-long-barrel.json';
import copperSectorLugsShortBarrel from '@/data/products/copper-sector-lugs-short-barrel.json';
import copperConnectors from '@/data/products/copper-connectors.json';
import aluminiumTubeTerminals from '@/data/products/aluminium-tube-terminals.json';
import aluminiumSectorLugs from '@/data/products/aluminium-sector-lugs.json';
import aluminiumConnectors from '@/data/products/aluminium-connectors.json';
import bimetallic from '@/data/products/bimetallic.json';
import ringTerminals from '@/data/products/ring-terminals.json';
import pinTerminals from '@/data/products/pin-terminals.json';
import forkTerminals from '@/data/products/fork-terminals.json';
import endSealingFerrules from '@/data/products/end-sealing-ferrules.json';
import cableGlandsBrassDoubleCompression from '@/data/products/cable-glands-brass-double-compression.json';
import cableGlandsSS316 from '@/data/products/cable-glands-ss316.json';
import cableGlandsNylon from '@/data/products/cable-glands-nylon.json';
import crimpingTools from '@/data/products/crimping-tools.json';

// Get catalog metadata
export function getCatalogMetadata(): CatalogMetadata {
  return catalogMetadata as CatalogMetadata;
}

// Helper to generate product name
function generateProductName(
  category: string,
  product: Record<string, unknown>,
  subcategory?: string
): string {
  const parts: string[] = [];

  if (product.size_sq_mm) {
    parts.push(`${product.size_sq_mm} sq mm`);
  }
  if (product.hole_size_mm) {
    parts.push(`${product.hole_size_mm}mm hole`);
  }
  if (product.model) {
    parts.push(String(product.model));
  }
  if (product.suitable_od_mm) {
    parts.push(`OD ${product.suitable_od_mm}mm`);
  }
  if (product.nipple_thread) {
    parts.push(`${product.nipple_thread} thread`);
  }

  const prefix = subcategory
    ? `${category} - ${subcategory}`
    : category;

  return parts.length > 0 ? `${prefix} - ${parts.join(', ')}` : prefix;
}

// Process standard products with catalog_no
function processStandardProducts(
  data: Record<string, unknown>,
  products: Array<Record<string, unknown>>
): NormalizedProduct[] {
  const normalized: NormalizedProduct[] = [];
  const { category, category_id, material, type, series } = data as {
    category: string;
    category_id: string;
    material?: string;
    type?: string;
    series?: string;
  };

  for (const product of products) {
    // Skip if no catalog_no
    if (!product.catalog_no) continue;

    normalized.push({
      id: `${category_id}-${product.catalog_no}`,
      catalog_no: String(product.catalog_no),
      name: generateProductName(category, product),
      category,
      categoryId: category_id,
      material,
      type,
      series: String(series || ''),
      size_sq_mm: product.size_sq_mm as number | undefined,
      hole_size_mm: product.hole_size_mm as number | null | undefined,
      price_inr: product.price_inr as number,
      std_pkg: product.std_pkg as number | undefined,
      description: product.description as string | undefined,
      specifications: {
        size_sq_mm: product.size_sq_mm as number | undefined,
        hole_size_mm: product.hole_size_mm as number | null | undefined,
        model: product.model as string | undefined,
        range_sq_mm: product.range_sq_mm as string | undefined,
      },
    });
  }

  return normalized;
}

// Process sector lugs with catalog_numbers object
function processSectorLugs(data: Record<string, unknown>): NormalizedProduct[] {
  const normalized: NormalizedProduct[] = [];
  const { category, category_id, material } = data as {
    category: string;
    category_id: string;
    material?: string;
  };

  const coreTypes = ['2_core', '3_core', '3.5_core', '4_core'];
  const coreLabels: Record<string, string> = {
    '2_core': '2 Core',
    '3_core': '3 Core',
    '3.5_core': '3.5 Core',
    '4_core': '4 Core',
  };

  // Helper to process a products array
  const processProductArray = (
    products: Array<{
      size_sq_mm: number;
      hole_size_mm: number;
      catalog_numbers: Record<string, string>;
      price_inr: number;
      std_pkg: number;
    }>,
    barrelType?: string
  ) => {
    for (const product of products) {
      for (const coreType of coreTypes) {
        const catalogNo = product.catalog_numbers?.[coreType];
        if (!catalogNo) continue;

        const subcatParts = [coreLabels[coreType]];
        if (barrelType) subcatParts.push(barrelType);

        normalized.push({
          id: `${category_id}-${catalogNo}`,
          catalog_no: catalogNo,
          name: `${category} ${coreLabels[coreType]}${barrelType ? ` (${barrelType})` : ''} - ${product.size_sq_mm} sq mm, ${product.hole_size_mm}mm hole`,
          category,
          categoryId: category_id,
          subcategory: coreLabels[coreType],
          material,
          size_sq_mm: product.size_sq_mm,
          hole_size_mm: product.hole_size_mm,
          price_inr: product.price_inr,
          std_pkg: product.std_pkg,
          specifications: {
            size_sq_mm: product.size_sq_mm,
            hole_size_mm: product.hole_size_mm,
            core_type: coreLabels[coreType],
            barrel_type: barrelType,
          },
        });
      }
    }
  };

  // Check if products are directly on data object (copper sector lugs)
  if (data.products && Array.isArray(data.products)) {
    processProductArray(data.products as Array<{
      size_sq_mm: number;
      hole_size_mm: number;
      catalog_numbers: Record<string, string>;
      price_inr: number;
      std_pkg: number;
    }>);
  }

  // Check for nested barrel types (aluminium sector lugs)
  const barrelTypes = ['long_barrel', 'short_barrel'];
  for (const barrelType of barrelTypes) {
    const barrelData = data[barrelType] as { products?: Array<unknown> } | undefined;
    if (barrelData?.products && Array.isArray(barrelData.products)) {
      const barrelLabel = barrelType.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      processProductArray(barrelData.products as Array<{
        size_sq_mm: number;
        hole_size_mm: number;
        catalog_numbers: Record<string, string>;
        price_inr: number;
        std_pkg: number;
      }>, barrelLabel);
    }
  }

  return normalized;
}

// Process cable glands with weather_proof/flame_proof variants
function processCableGlands(data: Record<string, unknown>): NormalizedProduct[] {
  const normalized: NormalizedProduct[] = [];
  const { category, category_id, material } = data as {
    category: string;
    category_id: string;
    material?: string;
  };

  const products = data.products as Array<{
    suitable_od_mm: string;
    nipple_thread: string;
    weather_proof?: { catalog_no: string; price_inr: number; box_pkg?: number };
    flame_proof?: { catalog_no: string; price_inr: number; box_pkg?: number };
  }>;

  for (const product of products) {
    if (product.weather_proof) {
      normalized.push({
        id: `${category_id}-wp-${product.weather_proof.catalog_no}`,
        catalog_no: product.weather_proof.catalog_no,
        name: `${category} Weather Proof - OD ${product.suitable_od_mm}mm, ${product.nipple_thread}`,
        category,
        categoryId: category_id,
        subcategory: 'Weather Proof',
        material,
        type: 'Weather Proof',
        price_inr: product.weather_proof.price_inr,
        std_pkg: product.weather_proof.box_pkg,
        specifications: {
          suitable_od_mm: product.suitable_od_mm,
          nipple_thread: product.nipple_thread,
          variant: 'Weather Proof',
        },
      });
    }
    if (product.flame_proof) {
      normalized.push({
        id: `${category_id}-fp-${product.flame_proof.catalog_no}`,
        catalog_no: product.flame_proof.catalog_no,
        name: `${category} Flame Proof - OD ${product.suitable_od_mm}mm, ${product.nipple_thread}`,
        category,
        categoryId: category_id,
        subcategory: 'Flame Proof',
        material,
        type: 'Flame Proof',
        price_inr: product.flame_proof.price_inr,
        std_pkg: product.flame_proof.box_pkg,
        specifications: {
          suitable_od_mm: product.suitable_od_mm,
          nipple_thread: product.nipple_thread,
          variant: 'Flame Proof',
        },
      });
    }
  }

  return normalized;
}

// Process nested categories (ring terminals, tools, bimetallic)
function processNestedProducts(data: Record<string, unknown>): NormalizedProduct[] {
  const normalized: NormalizedProduct[] = [];
  const { category, category_id, material, series } = data as {
    category: string;
    category_id: string;
    material?: string;
    series?: string;
  };

  const skipKeys = ['category', 'category_id', 'description', 'material', 'type', 'series', 'finish', 'manufacturing', 'variants', 'products', 'barrel_type'];

  for (const [key, value] of Object.entries(data)) {
    if (skipKeys.includes(key)) continue;
    if (typeof value !== 'object' || value === null) continue;

    const subcat = value as { products?: Array<Record<string, unknown>>; series?: string; description?: string };
    if (!subcat.products || !Array.isArray(subcat.products)) continue;

    const subcategoryName = key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    for (const product of subcat.products) {
      if (!product.catalog_no) continue;

      normalized.push({
        id: `${category_id}-${key}-${product.catalog_no}`,
        catalog_no: String(product.catalog_no),
        name: generateProductName(category, product, subcategoryName),
        category,
        categoryId: category_id,
        subcategory: subcategoryName,
        material,
        series: subcat.series || series,
        size_sq_mm: product.size_sq_mm as number | undefined,
        hole_size_mm: product.hole_size_mm as number | null | undefined,
        price_inr: product.price_inr as number,
        std_pkg: product.std_pkg as number | undefined,
        description: product.description as string | undefined,
        specifications: {
          size_sq_mm: product.size_sq_mm as number | undefined,
          hole_size_mm: product.hole_size_mm as number | null | undefined,
          model: product.model as string | undefined,
          range_sq_mm: product.range_sq_mm as string | undefined,
        },
      });
    }
  }

  return normalized;
}

// Normalize products from any file
function normalizeProductFile(data: unknown): NormalizedProduct[] {
  const dataObj = data as Record<string, unknown>;
  const categoryId = dataObj.category_id as string;

  // Sector lugs have catalog_numbers object
  if (categoryId.includes('sector-lugs')) {
    return processSectorLugs(dataObj);
  }

  // Cable glands have weather_proof/flame_proof variants
  if (categoryId.includes('cable-glands') || categoryId.includes('brass-cable')) {
    const products = dataObj.products as Array<Record<string, unknown>>;
    if (products?.[0]?.weather_proof || products?.[0]?.flame_proof) {
      return processCableGlands(dataObj);
    }
  }

  // Check if has direct products array with catalog_no
  const products = dataObj.products as Array<Record<string, unknown>>;
  if (products && Array.isArray(products) && products.length > 0) {
    if (products[0].catalog_no) {
      return processStandardProducts(dataObj, products);
    }
  }

  // Process nested categories (ring terminals, tools, bimetallic, etc.)
  return processNestedProducts(dataObj);
}

// Get all products normalized
export function getAllProducts(): NormalizedProduct[] {
  const allProductFiles = [
    copperTubeTerminalsMediumDuty,
    copperTubeTerminalsHeavyDutyBS4579,
    copperTubeTerminalsHeavyDutyLongBarrel,
    copperSectorLugsLongBarrel,
    copperSectorLugsShortBarrel,
    copperConnectors,
    aluminiumTubeTerminals,
    aluminiumSectorLugs,
    aluminiumConnectors,
    bimetallic,
    ringTerminals,
    pinTerminals,
    forkTerminals,
    endSealingFerrules,
    cableGlandsBrassDoubleCompression,
    cableGlandsSS316,
    cableGlandsNylon,
    crimpingTools,
  ];

  const allProducts: NormalizedProduct[] = [];

  for (const file of allProductFiles) {
    allProducts.push(...normalizeProductFile(file));
  }

  return allProducts;
}

// Get products by category slug
export function getProductsByCategory(categorySlug: string): NormalizedProduct[] {
  const allProducts = getAllProducts();
  return allProducts.filter((p) => p.categoryId === categorySlug);
}

// Get single product by catalog number
export function getProductByCatalogNo(catalogNo: string): NormalizedProduct | undefined {
  const allProducts = getAllProducts();
  return allProducts.find((p) => p.catalog_no === catalogNo);
}

// Get product by ID
export function getProductById(id: string): NormalizedProduct | undefined {
  const allProducts = getAllProducts();
  return allProducts.find((p) => p.id === id);
}

// Search products
export function searchProducts(query: string): NormalizedProduct[] {
  const allProducts = getAllProducts();
  const lowerQuery = query.toLowerCase();

  return allProducts.filter((p) => {
    return (
      p.name.toLowerCase().includes(lowerQuery) ||
      p.catalog_no.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.subcategory?.toLowerCase().includes(lowerQuery) ||
      p.material?.toLowerCase().includes(lowerQuery)
    );
  });
}

// Get all categories with product counts
export function getCategories(): ProductCategoryNav[] {
  const allProducts = getAllProducts();
  const categoryMap = new Map<string, ProductCategoryNav>();

  for (const product of allProducts) {
    const existing = categoryMap.get(product.categoryId);
    if (existing) {
      existing.productCount++;
    } else {
      categoryMap.set(product.categoryId, {
        id: product.categoryId,
        name: product.category,
        slug: product.categoryId,
        description: '',
        productCount: 1,
      });
    }
  }

  // Add descriptions from metadata
  const metadata = getCatalogMetadata();
  for (const cat of metadata.categories) {
    const existing = categoryMap.get(cat.id);
    if (existing) {
      existing.description = cat.description;
      existing.subcategories = cat.subcategories;
    }
  }

  return Array.from(categoryMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

// Get unique sizes for filtering
export function getUniqueSizes(): number[] {
  const allProducts = getAllProducts();
  const sizes = new Set<number>();

  for (const p of allProducts) {
    if (p.size_sq_mm) {
      sizes.add(p.size_sq_mm);
    }
  }

  return Array.from(sizes).sort((a, b) => a - b);
}

// Get unique materials
export function getUniqueMaterials(): string[] {
  const allProducts = getAllProducts();
  const materials = new Set<string>();

  for (const p of allProducts) {
    if (p.material) {
      materials.add(p.material);
    }
  }

  return Array.from(materials).sort();
}

// Filter products
export function filterProducts(
  products: NormalizedProduct[],
  filters: {
    category?: string;
    subcategory?: string;
    material?: string;
    size?: number;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }
): NormalizedProduct[] {
  return products.filter((p) => {
    if (filters.category && p.categoryId !== filters.category) return false;
    if (filters.subcategory && p.subcategory !== filters.subcategory) return false;
    if (filters.material && p.material !== filters.material) return false;
    if (filters.size && p.size_sq_mm !== filters.size) return false;
    if (filters.minPrice && p.price_inr < filters.minPrice) return false;
    if (filters.maxPrice && p.price_inr > filters.maxPrice) return false;
    if (filters.search) {
      const query = filters.search.toLowerCase();
      const matches =
        p.name.toLowerCase().includes(query) ||
        p.catalog_no.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);
      if (!matches) return false;
    }
    return true;
  });
}

// Format price for display
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(price);
}

// Category slug to display name mapping
export const categoryDisplayNames: Record<string, string> = {
  'copper-tube-terminals-medium-duty': 'Copper Tube Terminals - Medium Duty',
  'copper-tube-terminals-heavy-duty-bs4579': 'Copper Tube Terminals - Heavy Duty BS4579',
  'copper-tube-terminals-heavy-duty-long-barrel': 'Copper Tube Terminals - Heavy Duty Long Barrel',
  'copper-sector-lugs-long-barrel': 'Copper Sector Lugs - Long Barrel',
  'copper-sector-lugs-short-barrel': 'Copper Sector Lugs - Short Barrel',
  'copper-connectors': 'Copper Connectors',
  'aluminium-tube-terminals': 'Aluminium Tube Terminals',
  'aluminium-sector-lugs': 'Aluminium Sector Lugs',
  'aluminium-connectors': 'Aluminium Connectors',
  'bimetallic': 'Bi-Metallic Series',
  'ring-terminals': 'Ring Terminals',
  'pin-terminals': 'Pin Terminals',
  'fork-terminals': 'Fork Terminals',
  'end-sealing-ferrules': 'End Sealing Ferrules',
  'brass-cable-glands-double-compression': 'Brass Cable Glands - Double Compression',
  'cable-glands-ss316': 'SS316 Cable Glands',
  'cable-glands-nylon': 'Nylon Cable Glands',
  'crimping-tools': 'Crimping Tools',
};

// Get parent category for breadcrumbs
export function getParentCategory(categoryId: string): { name: string; slug: string } | null {
  if (categoryId.includes('copper-tube') || categoryId.includes('copper-sector') || categoryId.includes('copper-connector')) {
    return { name: 'Copper Lugs', slug: 'copper-lugs' };
  }
  if (categoryId.includes('aluminium')) {
    return { name: 'Aluminium Lugs', slug: 'aluminium-lugs' };
  }
  if (categoryId.includes('cable-glands') || categoryId.includes('brass-cable')) {
    return { name: 'Cable Glands', slug: 'cable-glands' };
  }
  if (categoryId.includes('terminal')) {
    return { name: 'Terminals', slug: 'terminals' };
  }
  return null;
}
