'use client';

import type { QuoteFormState, QuoteOptions } from '@/lib/quote-types';

interface CableSpecStepProps {
  formState: QuoteFormState;
  options: QuoteOptions;
  onChange: (field: keyof QuoteFormState, value: string | boolean) => void;
  errors: Record<string, string>;
}

export default function CableSpecStep({
  formState,
  options,
  onChange,
  errors,
}: CableSpecStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Cable Specifications
        </h2>
        <p className="text-gray-600">
          Tell us about your cable requirements. We will recommend the right lugs and glands.
        </p>
      </div>

      {/* Cable Size */}
      <div>
        <label
          htmlFor="cableSize"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Cable Size (sq mm) <span className="text-red-500">*</span>
        </label>
        <select
          id="cableSize"
          value={formState.cableSize}
          onChange={(e) => onChange('cableSize', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
            errors.cableSize ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select cable size</option>
          {options.cableSizes.map((size) => (
            <option key={size} value={size}>
              {size} sq mm
            </option>
          ))}
        </select>
        {errors.cableSize && (
          <p className="mt-1 text-sm text-red-600">{errors.cableSize}</p>
        )}
      </div>

      {/* Number of Cores */}
      <div>
        <label
          htmlFor="numberOfCores"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Number of Cores <span className="text-red-500">*</span>
        </label>
        <select
          id="numberOfCores"
          value={formState.numberOfCores}
          onChange={(e) => onChange('numberOfCores', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
            errors.numberOfCores ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          {options.coreOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {formState.numberOfCores === '3.5' && (
          <p className="mt-1 text-sm text-blue-600">
            3.5 core cables use 3 full-size lugs + 1 half-size lug (for reduced neutral)
          </p>
        )}
        {errors.numberOfCores && (
          <p className="mt-1 text-sm text-red-600">{errors.numberOfCores}</p>
        )}
      </div>

      {/* Conductor Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Conductor Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          {options.conductorTypes.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                formState.conductorType === opt.value
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="conductorType"
                value={opt.value}
                checked={formState.conductorType === opt.value}
                onChange={(e) => onChange('conductorType', e.target.value)}
                className="sr-only"
              />
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    formState.conductorType === opt.value
                      ? 'border-primary-600'
                      : 'border-gray-400'
                  }`}
                >
                  {formState.conductorType === opt.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />
                  )}
                </div>
                <span className="font-medium text-gray-900">{opt.label}</span>
              </div>
            </label>
          ))}
        </div>
        {formState.conductorType === 'sector' && (
          <p className="mt-2 text-sm text-gray-600">
            Sector shaped conductors are common in cables above 16 sq mm for better utilization of space.
          </p>
        )}
      </div>

      {/* Material */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Conductor Material <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-4">
          {options.materials.map((opt) => (
            <label
              key={opt.value}
              className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                formState.material === opt.value
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="material"
                value={opt.value}
                checked={formState.material === opt.value}
                onChange={(e) => onChange('material', e.target.value)}
                className="sr-only"
              />
              <span
                className={`text-2xl mb-1 ${
                  formState.material === opt.value
                    ? 'text-primary-600'
                    : 'text-gray-400'
                }`}
              >
                {opt.value === 'copper' && (
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                )}
                {opt.value === 'aluminium' && (
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                  </svg>
                )}
                {opt.value === 'bimetallic' && (
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 12h4v8h12v-8h4L12 2z" />
                  </svg>
                )}
              </span>
              <span className="font-medium text-gray-900">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Quantity (Number of Cable Ends) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={formState.quantity}
          onChange={(e) => onChange('quantity', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
            errors.quantity ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter quantity"
        />
        <p className="mt-1 text-sm text-gray-500">
          Each cable end needs 1 gland and lugs for all cores
        </p>
        {errors.quantity && (
          <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
        )}
      </div>

      {/* Application (Optional) */}
      <div>
        <label
          htmlFor="application"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Application / Project Name (Optional)
        </label>
        <input
          type="text"
          id="application"
          value={formState.application}
          onChange={(e) => onChange('application', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="e.g., Solar Plant Panel Board"
        />
      </div>
    </div>
  );
}
