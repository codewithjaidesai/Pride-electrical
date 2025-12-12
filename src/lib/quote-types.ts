// Quote Generator Types for Pride Electrical

// Cable specification input from customer
export interface CableSpecification {
  cableSize: number; // sq mm
  numberOfCores: 1 | 2 | 3 | 3.5 | 4;
  conductorType: 'round' | 'sector';
  material: 'copper' | 'aluminium' | 'bimetallic';
  quantity: number;
  application?: string;
}

// Lug selection options
export interface LugPreference {
  type: 'ring' | 'pin' | 'fork' | 'tube-terminal';
  insulated: boolean;
  holeSize?: number; // mm, optional - will use industry standard if not specified
  barrelType?: 'short' | 'long' | 'medium'; // for sector lugs
}

// Gland selection options
export interface GlandPreference {
  needed: boolean;
  material?: 'brass' | 'ss316' | 'nylon';
  type?: 'weather-proof' | 'flame-proof';
  cableOD?: number; // Cable outer diameter in mm
}

// Product match result from search
export interface ProductMatch {
  product: {
    id: string;
    catalog_no: string;
    name: string;
    price_inr: number;
    category: string;
    categoryId: string;
    size_sq_mm?: number;
    hole_size_mm?: number | null;
    material?: string;
    type?: string;
    subcategory?: string;
  };
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  isExactMatch: boolean;
  alternativeNote?: string;
}

// Quote warning/note
export interface QuoteNote {
  type: 'info' | 'warning' | 'error';
  message: string;
  field?: string;
}

// Quote line item
export interface QuoteLineItem {
  id: string;
  productType: 'lug' | 'gland' | 'connector' | 'ferrule' | 'tool';
  description: string;
  catalogNo: string;
  size?: string;
  specification: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string[];
  isAlternative?: boolean;
}

// Complete quote result
export interface QuoteResult {
  referenceNumber: string;
  createdAt: Date;

  // Input summary
  cableSpec: CableSpecification;
  lugPreference?: LugPreference;
  glandPreference?: GlandPreference;

  // Line items
  lineItems: QuoteLineItem[];

  // Calculations
  subtotal: number;
  notes: QuoteNote[];

  // Breakdown explanations
  coreMultiplierExplanation: string;
  calculationBreakdown: string[];

  // Contact info
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerCompany?: string;
}

// Quote form state
export interface QuoteFormState {
  step: 1 | 2 | 3 | 4;

  // Step 1: Cable specs
  cableSize: string;
  numberOfCores: string;
  conductorType: string;
  material: string;
  quantity: string;
  application: string;

  // Step 2: Gland preference
  needsGland: boolean;
  glandMaterial: string;
  glandType: string;
  cableOD: string;

  // Step 3: Lug preference
  lugType: string;
  lugInsulated: boolean;
  holeSize: string;
  barrelType: string;

  // Step 4: Contact info
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany: string;
  additionalNotes: string;
}

// Available options for form
export interface QuoteOptions {
  cableSizes: number[];
  coreOptions: Array<{ value: number; label: string }>;
  conductorTypes: Array<{ value: string; label: string }>;
  materials: Array<{ value: string; label: string }>;
  lugTypes: Array<{ value: string; label: string }>;
  glandMaterials: Array<{ value: string; label: string }>;
  glandTypes: Array<{ value: string; label: string }>;
  barrelTypes: Array<{ value: string; label: string }>;
  holeSizes: number[];
}

// Standard hole sizes by cable size (industry defaults)
export const STANDARD_HOLE_SIZES: Record<number, number> = {
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

// Default quote form values
export const DEFAULT_QUOTE_FORM: QuoteFormState = {
  step: 1,
  cableSize: '',
  numberOfCores: '3',
  conductorType: 'round',
  material: 'copper',
  quantity: '1',
  application: '',
  needsGland: true,
  glandMaterial: 'brass',
  glandType: 'weather-proof',
  cableOD: '',
  lugType: 'tube-terminal',
  lugInsulated: false,
  holeSize: '',
  barrelType: 'medium',
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  customerCompany: '',
  additionalNotes: '',
};
