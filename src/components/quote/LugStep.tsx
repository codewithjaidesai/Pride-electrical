'use client';

import type { QuoteFormState, QuoteOptions } from '@/lib/quote-types';
import { getStandardHoleSize } from '@/lib/quote-engine';

interface LugStepProps {
  formState: QuoteFormState;
  options: QuoteOptions;
  onChange: (field: keyof QuoteFormState, value: string | boolean) => void;
  errors: Record<string, string>;
}

export default function LugStep({
  formState,
  options,
  onChange,
  errors,
}: LugStepProps) {
  const cableSize = parseFloat(formState.cableSize) || 0;
  const cores = parseFloat(formState.numberOfCores) || 3;
  const quantity = parseInt(formState.quantity) || 1;

  // Calculate lug quantity based on Rule 3 & 4
  let lugQuantity = quantity * cores;
  let lugBreakdown = `${quantity} cables x ${cores} cores = ${lugQuantity} lugs`;

  if (cores === 3.5) {
    const fullSize = quantity * 3;
    const halfSize = quantity;
    lugBreakdown = `${fullSize} full-size (${cableSize} sq mm) + ${halfSize} half-size (${cableSize / 2} sq mm)`;
    lugQuantity = fullSize + halfSize;
  }

  const standardHole = cableSize ? getStandardHoleSize(cableSize) : null;

  // Show sector options only for sector conductor
  const showBarrelType = formState.conductorType === 'sector';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Cable Lug Selection
        </h2>
        <p className="text-gray-600">
          Choose the type of cable lugs for terminating your conductors.
        </p>
      </div>

      {/* Lug Quantity Info */}
      <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
        <div className="flex items-start">
          <svg
            className="h-6 w-6 text-primary-600 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
            />
          </svg>
          <div className="ml-3">
            <h4 className="font-semibold text-primary-900">
              Lug Quantity: {lugQuantity}
            </h4>
            <p className="text-sm text-primary-700 mt-1">{lugBreakdown}</p>
          </div>
        </div>
      </div>

      {/* Lug Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Lug Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {options.lugTypes.map((opt) => (
            <label
              key={opt.value}
              className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                formState.lugType === opt.value
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="lugType"
                value={opt.value}
                checked={formState.lugType === opt.value}
                onChange={(e) => onChange('lugType', e.target.value)}
                className="sr-only"
              />
              <div className="w-12 h-12 mb-2 flex items-center justify-center">
                {opt.value === 'tube-terminal' && (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
                    <rect x="2" y="8" width="12" height="8" rx="1" className="text-gray-400" />
                    <circle cx="19" cy="12" r="4" className="text-gray-600" fill="none" strokeWidth="2" stroke="currentColor" />
                  </svg>
                )}
                {opt.value === 'ring' && (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
                    <rect x="2" y="9" width="8" height="6" rx="1" className="text-gray-400" />
                    <circle cx="17" cy="12" r="5" className="text-gray-600" fill="none" strokeWidth="2" stroke="currentColor" />
                  </svg>
                )}
                {opt.value === 'pin' && (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
                    <rect x="2" y="9" width="8" height="6" rx="1" className="text-gray-400" />
                    <rect x="12" y="10" width="10" height="4" rx="1" className="text-gray-600" />
                  </svg>
                )}
                {opt.value === 'fork' && (
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
                    <rect x="2" y="9" width="8" height="6" rx="1" className="text-gray-400" />
                    <path d="M12 10h3v4h-3v-4zm6 0h3v4h-3v-4z" className="text-gray-600" />
                  </svg>
                )}
              </div>
              <span className="font-medium text-gray-900 text-sm text-center">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Barrel Type (for sector conductors) */}
      {showBarrelType && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Barrel Type
          </label>
          <div className="grid grid-cols-3 gap-4">
            {options.barrelTypes.map((opt) => (
              <label
                key={opt.value}
                className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-colors ${
                  formState.barrelType === opt.value
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="barrelType"
                  value={opt.value}
                  checked={formState.barrelType === opt.value}
                  onChange={(e) => onChange('barrelType', e.target.value)}
                  className="sr-only"
                />
                <span className="font-semibold text-gray-900">{opt.label}</span>
                <span className="text-xs text-gray-500 mt-1">
                  {opt.value === 'long' && 'For deeper crimping'}
                  {opt.value === 'short' && 'Standard depth'}
                  {opt.value === 'medium' && 'General purpose'}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Insulated Option */}
      <div className="bg-gray-50 rounded-xl p-4">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            checked={formState.lugInsulated}
            onChange={(e) => onChange('lugInsulated', e.target.checked)}
            className="mt-1 h-5 w-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <div className="ml-3">
            <span className="font-medium text-gray-900">Insulated Lugs</span>
            <p className="text-sm text-gray-600 mt-1">
              Insulated lugs provide additional protection against accidental contact.
              Recommended for exposed terminations.
            </p>
          </div>
        </label>
        {formState.lugInsulated && cableSize && cableSize <= 1.5 && (
          <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> For small sizes (0.5-1.5 sq mm), you may need End Sealing
              Ferrules instead of Pin Terminals. Both options will be provided in the quote.
            </p>
          </div>
        )}
      </div>

      {/* Hole Size */}
      <div>
        <label
          htmlFor="holeSize"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Hole Size (mm)
        </label>
        <div className="flex gap-4">
          <select
            id="holeSize"
            value={formState.holeSize}
            onChange={(e) => onChange('holeSize', e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">
              {standardHole
                ? `Industry Standard (${standardHole}mm)`
                : 'Select hole size'}
            </option>
            {options.holeSizes.map((size) => (
              <option key={size} value={size}>
                {size} mm {size === standardHole ? '(standard)' : ''}
              </option>
            ))}
          </select>
        </div>
        {standardHole && !formState.holeSize && (
          <p className="mt-1 text-sm text-gray-500">
            Industry standard for {cableSize} sq mm cables is {standardHole}mm hole
          </p>
        )}
      </div>

      {/* Material reminder */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-sm text-gray-700">
          <strong>Material:</strong>{' '}
          {formState.material.charAt(0).toUpperCase() + formState.material.slice(1)} lugs
          will be selected to match your {formState.material} conductor.
        </p>
      </div>
    </div>
  );
}
