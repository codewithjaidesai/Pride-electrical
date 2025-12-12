/**
 * Quote Engine for Pride Electrical
 * Implements all business rules from PROJECT_REQUIREMENTS.md
 */

import { getAllProducts, getUniqueSizes, formatPrice } from './products';
import type { NormalizedProduct } from './types';
import type {
  CableSpecification,
  LugPreference,
  GlandPreference,
  QuoteResult,
  QuoteLineItem,
  QuoteNote,
  QuoteOptions,
  STANDARD_HOLE_SIZES,
} from './quote-types';

// Re-export standard hole sizes
export { STANDARD_HOLE_SIZES } from './quote-types';

/**
 * Rule 9: Size Format Normalization
 * Normalize all size formats before matching
 */
export function normalizeSize(input: string): number | null {
  // Remove common suffixes and normalize
  const normalized = input
    .toLowerCase()
    .replace(/sqmm/g, '')
    .replace(/sq\.mm/g, '')
    .replace(/sq mm/g, '')
    .replace(/mm²/g, '')
    .replace(/mm2/g, '')
    .replace(/square mm/g, '')
    .replace(/\s+/g, '')
    .trim();

  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? null : parsed;
}

/**
 * Rule 3: Core Multiplier Formula
 * Calculate lug quantity based on number of cores
 */
export function calculateLugQuantity(
  orderQuantity: number,
  numberOfCores: number
): { totalLugs: number; breakdown: string } {
  // For 3.5 core, this will be handled separately (Rule 4)
  if (numberOfCores === 3.5) {
    const fullSizeLugs = orderQuantity * 3;
    const halfSizeLugs = orderQuantity;
    return {
      totalLugs: fullSizeLugs + halfSizeLugs,
      breakdown: `${fullSizeLugs} full-size + ${halfSizeLugs} half-size lugs`,
    };
  }

  const totalLugs = orderQuantity * numberOfCores;
  return {
    totalLugs,
    breakdown: `${orderQuantity} cables × ${numberOfCores} cores = ${totalLugs} lugs`,
  };
}

/**
 * Rule 4: 3.5 Core Special Rule
 * For 3.5 core cables: 3 full size + 1 half size
 */
export function calculate35CoreLugs(
  orderQuantity: number,
  cableSize: number
): {
  fullSizeQty: number;
  fullSizeSize: number;
  halfSizeQty: number;
  halfSizeSize: number;
} {
  return {
    fullSizeQty: orderQuantity * 3,
    fullSizeSize: cableSize,
    halfSizeQty: orderQuantity,
    halfSizeSize: cableSize / 2,
  };
}

/**
 * Rule 5: Find closest available size
 * If exact size unavailable, offer the closest available size (next size UP)
 */
export function findClosestSize(
  targetSize: number,
  availableSizes: number[]
): { size: number; isExact: boolean } {
  // First try exact match
  if (availableSizes.includes(targetSize)) {
    return { size: targetSize, isExact: true };
  }

  // Find next size up (safer for electrical applications)
  const sortedSizes = [...availableSizes].sort((a, b) => a - b);
  const nextSizeUp = sortedSizes.find((s) => s > targetSize);

  if (nextSizeUp) {
    return { size: nextSizeUp, isExact: false };
  }

  // If no size up available, use the largest available
  if (sortedSizes.length > 0) {
    return { size: sortedSizes[sortedSizes.length - 1], isExact: false };
  }

  return { size: targetSize, isExact: false };
}

/**
 * Rule 8: Get industry standard hole size
 */
export function getStandardHoleSize(cableSizeSqMm: number): number | null {
  const standardSizes: Record<number, number> = {
    1.5: 4,
    2.5: 5,
    4: 6,
    6: 6,
    10: 8,
    16: 8,
    25: 10,
    35: 10,
    50: 10,
    70: 12,
    95: 12,
    120: 14,
    150: 14,
    185: 16,
    240: 17,
    300: 17,
    400: 21,
    500: 21,
    630: 21,
  };

  // Direct match
  if (standardSizes[cableSizeSqMm]) {
    return standardSizes[cableSizeSqMm];
  }

  // Find closest match
  const sizes = Object.keys(standardSizes).map(Number).sort((a, b) => a - b);
  const closest = sizes.find((s) => s >= cableSizeSqMm);
  return closest ? standardSizes[closest] : null;
}

/**
 * Search for matching lugs
 */
export function findMatchingLugs(
  allProducts: NormalizedProduct[],
  cableSize: number,
  material: string,
  conductorType: string,
  lugType: string,
  insulated: boolean,
  holeSize?: number,
  barrelType?: string
): { product: NormalizedProduct | null; alternatives: NormalizedProduct[]; notes: string[] } {
  const notes: string[] = [];
  const candidates: NormalizedProduct[] = [];

  // Filter by material
  const materialFilter = material.toLowerCase();
  let filtered = allProducts.filter((p) => {
    const pMaterial = (p.material || p.category).toLowerCase();
    return pMaterial.includes(materialFilter) || pMaterial.includes(material);
  });

  // Filter by conductor type (sector vs round/tube)
  if (conductorType === 'sector') {
    filtered = filtered.filter((p) =>
      p.categoryId.includes('sector') || p.category.toLowerCase().includes('sector')
    );
  } else {
    // Round conductors use tube terminals
    filtered = filtered.filter(
      (p) =>
        p.categoryId.includes('tube-terminal') ||
        p.categoryId.includes('ring-terminal') ||
        p.categoryId.includes('pin-terminal') ||
        p.categoryId.includes('fork-terminal') ||
        p.category.toLowerCase().includes('tube terminal') ||
        (!p.categoryId.includes('sector') && !p.category.toLowerCase().includes('sector'))
    );
  }

  // Rule 7: Copper Flat Type → CUS series (Medium Duty)
  if (material === 'copper' && lugType === 'tube-terminal' && conductorType === 'round') {
    const cusProducts = filtered.filter(
      (p) =>
        p.categoryId === 'copper-tube-terminals-medium-duty' ||
        p.series?.includes('CUS')
    );
    if (cusProducts.length > 0) {
      filtered = cusProducts;
    }
  }

  // Filter by lug type
  if (lugType === 'ring') {
    filtered = filtered.filter(
      (p) =>
        p.categoryId.includes('ring') ||
        p.subcategory?.toLowerCase().includes('ring') ||
        p.category.toLowerCase().includes('ring')
    );
  } else if (lugType === 'pin') {
    filtered = filtered.filter(
      (p) =>
        p.categoryId.includes('pin') ||
        p.subcategory?.toLowerCase().includes('pin') ||
        p.category.toLowerCase().includes('pin')
    );
  } else if (lugType === 'fork') {
    filtered = filtered.filter(
      (p) =>
        p.categoryId.includes('fork') ||
        p.subcategory?.toLowerCase().includes('fork') ||
        p.category.toLowerCase().includes('fork')
    );
  }

  // Filter by insulated
  if (insulated) {
    const insulatedProducts = filtered.filter(
      (p) =>
        p.subcategory?.toLowerCase().includes('insulated') ||
        p.category.toLowerCase().includes('insulated') ||
        p.name.toLowerCase().includes('insulated')
    );
    if (insulatedProducts.length > 0) {
      filtered = insulatedProducts;
    } else {
      notes.push('Insulated variant not available for this size/type');
    }
  }

  // Rule 6: Insulated Pin Type in small sizes → might need End Sealing Ferrules
  if (insulated && lugType === 'pin' && cableSize <= 1.5) {
    notes.push(
      'For small insulated pin terminals (0.5-1.5 sq mm), you may need End Sealing Ferrules instead. Both options are provided.'
    );
    // Also include ferrules as alternatives
    const ferrules = allProducts.filter(
      (p) =>
        p.categoryId.includes('ferrule') ||
        p.category.toLowerCase().includes('ferrule')
    );
    candidates.push(...ferrules.filter((p) => p.size_sq_mm && p.size_sq_mm <= 2.5));
  }

  // Filter by barrel type for sector lugs
  if (conductorType === 'sector' && barrelType) {
    const barrelFiltered = filtered.filter((p) => {
      if (barrelType === 'long') {
        return (
          p.categoryId.includes('long-barrel') ||
          p.specifications?.barrel_type === 'Long Barrel'
        );
      }
      if (barrelType === 'short') {
        return (
          p.categoryId.includes('short-barrel') ||
          p.specifications?.barrel_type === 'Short Barrel'
        );
      }
      return true;
    });
    if (barrelFiltered.length > 0) {
      filtered = barrelFiltered;
    }
  }

  // Get available sizes
  const availableSizes = [...new Set(filtered.filter((p) => p.size_sq_mm).map((p) => p.size_sq_mm!))];

  // Find matching size (Rule 5)
  const { size: matchingSize, isExact } = findClosestSize(cableSize, availableSizes);
  if (!isExact) {
    notes.push(`Exact size ${cableSize} sq mm not available. Using ${matchingSize} sq mm (next size up).`);
  }

  // Filter by size
  let sizeFiltered = filtered.filter((p) => p.size_sq_mm === matchingSize);

  // Filter by hole size (Rule 8)
  const targetHoleSize = holeSize || getStandardHoleSize(cableSize);
  if (targetHoleSize && sizeFiltered.length > 1) {
    const holeFiltered = sizeFiltered.filter(
      (p) => p.hole_size_mm === targetHoleSize
    );
    if (holeFiltered.length > 0) {
      sizeFiltered = holeFiltered;
    } else {
      notes.push(
        `Standard hole size ${targetHoleSize}mm not available for this product. Using closest match.`
      );
    }
  }

  // Get the best match
  const bestMatch = sizeFiltered[0] || null;
  const alternatives = sizeFiltered.slice(1, 4).concat(candidates.slice(0, 2));

  return { product: bestMatch, alternatives, notes };
}

/**
 * Search for matching cable glands
 */
export function findMatchingGlands(
  allProducts: NormalizedProduct[],
  glandMaterial: string,
  glandType: string,
  cableOD?: number
): { product: NormalizedProduct | null; alternatives: NormalizedProduct[]; notes: string[] } {
  const notes: string[] = [];

  // Filter by material
  let filtered = allProducts.filter((p) => {
    const categoryLower = p.categoryId.toLowerCase();
    const materialLower = glandMaterial.toLowerCase();

    if (materialLower === 'brass') {
      return categoryLower.includes('brass');
    }
    if (materialLower === 'ss316') {
      return categoryLower.includes('ss316') || categoryLower.includes('stainless');
    }
    if (materialLower === 'nylon') {
      return categoryLower.includes('nylon');
    }
    return true;
  });

  // Filter by type (weather-proof vs flame-proof)
  if (glandType === 'weather-proof') {
    filtered = filtered.filter(
      (p) =>
        p.subcategory?.toLowerCase().includes('weather') ||
        p.type?.toLowerCase().includes('weather')
    );
  } else if (glandType === 'flame-proof') {
    filtered = filtered.filter(
      (p) =>
        p.subcategory?.toLowerCase().includes('flame') ||
        p.type?.toLowerCase().includes('flame')
    );
  }

  // Filter by cable OD if provided
  if (cableOD && filtered.length > 0) {
    const odFiltered = filtered.filter((p) => {
      const odSpec = p.specifications?.suitable_od_mm;
      if (!odSpec) return true;

      // Parse range like "3.0-6.5"
      const odString = String(odSpec);
      const match = odString.match(/(\d+\.?\d*)\s*-\s*(\d+\.?\d*)/);
      if (match) {
        const minOD = parseFloat(match[1]);
        const maxOD = parseFloat(match[2]);
        return cableOD >= minOD && cableOD <= maxOD;
      }
      return true;
    });

    if (odFiltered.length > 0) {
      filtered = odFiltered;
    } else {
      notes.push(
        `No exact cable OD match found for ${cableOD}mm. Please verify gland selection.`
      );
    }
  }

  const bestMatch = filtered[0] || null;
  const alternatives = filtered.slice(1, 4);

  return { product: bestMatch, alternatives, notes };
}

/**
 * Generate unique quote reference number
 */
export function generateQuoteReference(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `PE${year}${month}${day}-${random}`;
}

/**
 * Main quote generation function
 * Implements all business rules
 */
export function generateQuote(
  cableSpec: CableSpecification,
  lugPreference?: LugPreference,
  glandPreference?: GlandPreference,
  customerInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
  }
): QuoteResult {
  const allProducts = getAllProducts();
  const lineItems: QuoteLineItem[] = [];
  const notes: QuoteNote[] = [];
  const calculationBreakdown: string[] = [];

  // Rule 3: Calculate quantities
  const glandQty = glandPreference?.needed ? cableSpec.quantity : 0;
  const lugCalc = calculateLugQuantity(cableSpec.quantity, cableSpec.numberOfCores);

  calculationBreakdown.push(`Order quantity: ${cableSpec.quantity} cables`);
  calculationBreakdown.push(`Number of cores: ${cableSpec.numberOfCores}`);

  // Rule 4: Handle 3.5 core special case
  if (cableSpec.numberOfCores === 3.5) {
    const calc35 = calculate35CoreLugs(cableSpec.quantity, cableSpec.cableSize);

    calculationBreakdown.push(`3.5 Core Special Rule Applied:`);
    calculationBreakdown.push(
      `  - Full size (${calc35.fullSizeSize} sq mm): ${calc35.fullSizeQty} lugs`
    );
    calculationBreakdown.push(
      `  - Half size (${calc35.halfSizeSize} sq mm): ${calc35.halfSizeQty} lugs`
    );

    // Find full-size lugs
    const fullSizeLugs = findMatchingLugs(
      allProducts,
      calc35.fullSizeSize,
      cableSpec.material,
      cableSpec.conductorType,
      lugPreference?.type || 'tube-terminal',
      lugPreference?.insulated || false,
      lugPreference?.holeSize,
      lugPreference?.barrelType
    );

    if (fullSizeLugs.product) {
      lineItems.push({
        id: `lug-full-${fullSizeLugs.product.catalog_no}`,
        productType: 'lug',
        description: fullSizeLugs.product.name,
        catalogNo: fullSizeLugs.product.catalog_no,
        size: `${calc35.fullSizeSize} sq mm`,
        specification: `Full-size for 3.5 core cable`,
        quantity: calc35.fullSizeQty,
        unitPrice: fullSizeLugs.product.price_inr,
        totalPrice: fullSizeLugs.product.price_inr * calc35.fullSizeQty,
        notes: fullSizeLugs.notes,
      });
    }

    fullSizeLugs.notes.forEach((note) => {
      notes.push({ type: 'info', message: note, field: 'lug-full' });
    });

    // Find half-size lugs
    const halfSizeLugs = findMatchingLugs(
      allProducts,
      calc35.halfSizeSize,
      cableSpec.material,
      cableSpec.conductorType,
      lugPreference?.type || 'tube-terminal',
      lugPreference?.insulated || false,
      lugPreference?.holeSize,
      lugPreference?.barrelType
    );

    if (halfSizeLugs.product) {
      lineItems.push({
        id: `lug-half-${halfSizeLugs.product.catalog_no}`,
        productType: 'lug',
        description: halfSizeLugs.product.name,
        catalogNo: halfSizeLugs.product.catalog_no,
        size: `${calc35.halfSizeSize} sq mm`,
        specification: `Half-size for 3.5 core cable (neutral)`,
        quantity: calc35.halfSizeQty,
        unitPrice: halfSizeLugs.product.price_inr,
        totalPrice: halfSizeLugs.product.price_inr * calc35.halfSizeQty,
        notes: halfSizeLugs.notes,
      });
    }

    halfSizeLugs.notes.forEach((note) => {
      notes.push({ type: 'info', message: note, field: 'lug-half' });
    });
  } else {
    // Standard lug calculation
    calculationBreakdown.push(lugCalc.breakdown);

    const lugs = findMatchingLugs(
      allProducts,
      cableSpec.cableSize,
      cableSpec.material,
      cableSpec.conductorType,
      lugPreference?.type || 'tube-terminal',
      lugPreference?.insulated || false,
      lugPreference?.holeSize,
      lugPreference?.barrelType
    );

    if (lugs.product) {
      lineItems.push({
        id: `lug-${lugs.product.catalog_no}`,
        productType: 'lug',
        description: lugs.product.name,
        catalogNo: lugs.product.catalog_no,
        size: `${cableSpec.cableSize} sq mm`,
        specification: `${cableSpec.material} ${cableSpec.conductorType} conductor`,
        quantity: lugCalc.totalLugs,
        unitPrice: lugs.product.price_inr,
        totalPrice: lugs.product.price_inr * lugCalc.totalLugs,
        notes: lugs.notes,
      });
    } else {
      notes.push({
        type: 'warning',
        message: `No matching lug found for ${cableSpec.cableSize} sq mm ${cableSpec.material} cable. Please contact us for assistance.`,
        field: 'lug',
      });
    }

    lugs.notes.forEach((note) => {
      notes.push({ type: 'info', message: note, field: 'lug' });
    });
  }

  // Find glands if needed
  if (glandPreference?.needed) {
    calculationBreakdown.push(`Glands: ${glandQty} (1 per cable entry)`);

    const glands = findMatchingGlands(
      allProducts,
      glandPreference.material || 'brass',
      glandPreference.type || 'weather-proof',
      glandPreference.cableOD
    );

    if (glands.product) {
      lineItems.push({
        id: `gland-${glands.product.catalog_no}`,
        productType: 'gland',
        description: glands.product.name,
        catalogNo: glands.product.catalog_no,
        specification: `${glandPreference.material || 'Brass'} ${glandPreference.type || 'Weather Proof'}`,
        quantity: glandQty,
        unitPrice: glands.product.price_inr,
        totalPrice: glands.product.price_inr * glandQty,
        notes: glands.notes,
      });
    } else {
      notes.push({
        type: 'warning',
        message: `No matching cable gland found. Please specify cable outer diameter or contact us.`,
        field: 'gland',
      });
    }

    glands.notes.forEach((note) => {
      notes.push({ type: 'info', message: note, field: 'gland' });
    });
  }

  // Calculate totals
  const subtotal = lineItems.reduce((sum, item) => sum + item.totalPrice, 0);

  // Build core multiplier explanation
  let coreMultiplierExplanation = '';
  if (cableSpec.numberOfCores === 3.5) {
    coreMultiplierExplanation = `For ${cableSpec.numberOfCores} core cables: 3 full-size lugs + 1 half-size lug per cable. Half size = ${cableSpec.cableSize / 2} sq mm.`;
  } else {
    coreMultiplierExplanation = `For ${cableSpec.numberOfCores} core cables: ${cableSpec.numberOfCores} lugs per cable end.`;
  }

  // Add pricing note
  notes.push({
    type: 'info',
    message: 'Prices shown are list prices. Contact us for dealer/bulk pricing.',
  });

  return {
    referenceNumber: generateQuoteReference(),
    createdAt: new Date(),
    cableSpec,
    lugPreference,
    glandPreference,
    lineItems,
    subtotal,
    notes,
    coreMultiplierExplanation,
    calculationBreakdown,
    customerName: customerInfo?.name,
    customerEmail: customerInfo?.email,
    customerPhone: customerInfo?.phone,
    customerCompany: customerInfo?.company,
  };
}

/**
 * Get available options for quote form
 */
export function getQuoteOptions(): QuoteOptions {
  const allProducts = getAllProducts();
  const sizes = getUniqueSizes();

  // Get unique hole sizes
  const holeSizes = [
    ...new Set(
      allProducts
        .filter((p) => p.hole_size_mm)
        .map((p) => p.hole_size_mm as number)
    ),
  ].sort((a, b) => a - b);

  return {
    cableSizes: sizes,
    coreOptions: [
      { value: 1, label: '1 Core (Single)' },
      { value: 2, label: '2 Core' },
      { value: 3, label: '3 Core' },
      { value: 3.5, label: '3.5 Core (3 + Reduced Neutral)' },
      { value: 4, label: '4 Core' },
    ],
    conductorTypes: [
      { value: 'round', label: 'Round Conductor' },
      { value: 'sector', label: 'Sector Shaped' },
    ],
    materials: [
      { value: 'copper', label: 'Copper' },
      { value: 'aluminium', label: 'Aluminium' },
      { value: 'bimetallic', label: 'Bi-metallic' },
    ],
    lugTypes: [
      { value: 'tube-terminal', label: 'Tube Terminal' },
      { value: 'ring', label: 'Ring Terminal' },
      { value: 'pin', label: 'Pin Terminal' },
      { value: 'fork', label: 'Fork Terminal' },
    ],
    glandMaterials: [
      { value: 'brass', label: 'Brass' },
      { value: 'ss316', label: 'Stainless Steel (SS316)' },
      { value: 'nylon', label: 'Nylon' },
    ],
    glandTypes: [
      { value: 'weather-proof', label: 'Weather Proof' },
      { value: 'flame-proof', label: 'Flame Proof' },
    ],
    barrelTypes: [
      { value: 'medium', label: 'Medium Duty' },
      { value: 'long', label: 'Long Barrel' },
      { value: 'short', label: 'Short Barrel' },
    ],
    holeSizes,
  };
}

/**
 * Validate cable specification
 */
export function validateCableSpec(spec: Partial<CableSpecification>): string[] {
  const errors: string[] = [];

  if (!spec.cableSize || spec.cableSize <= 0) {
    errors.push('Please select a valid cable size');
  }

  if (!spec.numberOfCores) {
    errors.push('Please select number of cores');
  }

  if (!spec.quantity || spec.quantity <= 0) {
    errors.push('Please enter a valid quantity');
  }

  if (!spec.material) {
    errors.push('Please select cable material');
  }

  if (!spec.conductorType) {
    errors.push('Please select conductor type');
  }

  return errors;
}
