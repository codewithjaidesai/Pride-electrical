'use client';

import type { QuoteFormState, QuoteOptions } from '@/lib/quote-types';

interface GlandStepProps {
  formState: QuoteFormState;
  options: QuoteOptions;
  onChange: (field: keyof QuoteFormState, value: string | boolean) => void;
  errors: Record<string, string>;
}

export default function GlandStep({
  formState,
  options,
  onChange,
  errors,
}: GlandStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Cable Gland Selection
        </h2>
        <p className="text-gray-600">
          Cable glands provide secure cable entry and strain relief. Select your requirements below.
        </p>
      </div>

      {/* Need Gland Toggle */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">
              Do you need cable glands?
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Glands are recommended for proper cable termination and IP protection
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formState.needsGland}
              onChange={(e) => onChange('needsGland', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>

      {formState.needsGland && (
        <>
          {/* Gland Material */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gland Material
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {options.glandMaterials.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-colors ${
                    formState.glandMaterial === opt.value
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="glandMaterial"
                    value={opt.value}
                    checked={formState.glandMaterial === opt.value}
                    onChange={(e) => onChange('glandMaterial', e.target.value)}
                    className="sr-only"
                  />
                  <span className="font-semibold text-gray-900">{opt.label}</span>
                  <span className="text-sm text-gray-500 mt-1">
                    {opt.value === 'brass' && 'Most common, corrosion resistant'}
                    {opt.value === 'ss316' && 'Marine/chemical environments'}
                    {opt.value === 'nylon' && 'Lightweight, non-conductive'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Gland Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gland Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              {options.glandTypes.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-colors ${
                    formState.glandType === opt.value
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="glandType"
                    value={opt.value}
                    checked={formState.glandType === opt.value}
                    onChange={(e) => onChange('glandType', e.target.value)}
                    className="sr-only"
                  />
                  <span className="font-semibold text-gray-900">{opt.label}</span>
                  <span className="text-sm text-gray-500 mt-1">
                    {opt.value === 'weather-proof' &&
                      'Standard IP68 protection for indoor/outdoor use'}
                    {opt.value === 'flame-proof' &&
                      'For hazardous areas with explosive atmospheres'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Cable OD */}
          <div>
            <label
              htmlFor="cableOD"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cable Outer Diameter (mm)
            </label>
            <input
              type="number"
              id="cableOD"
              step="0.1"
              min="1"
              max="100"
              value={formState.cableOD}
              onChange={(e) => onChange('cableOD', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="e.g., 15.5"
            />
            <p className="mt-1 text-sm text-gray-500">
              Check your cable datasheet for exact outer diameter. Leave blank if unknown.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex">
              <svg
                className="h-5 w-5 text-blue-600 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-800">
                  Gland Quantity
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  Based on your input, you need <strong>{formState.quantity || 1}</strong> gland(s) -
                  one for each cable entry point.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {!formState.needsGland && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex">
            <svg
              className="h-5 w-5 text-yellow-600 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                Cable glands provide important protection and strain relief.
                Consider adding them for proper installation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
