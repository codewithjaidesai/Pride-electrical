'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface CategoryFiltersProps {
  category: string;
  subcategories: string[];
  sizes: number[];
  currentSubcategory?: string;
  currentSize?: string;
}

export default function CategoryFilters({
  category,
  subcategories,
  sizes,
  currentSubcategory,
  currentSize,
}: CategoryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page'); // Reset to page 1 when filtering
    router.push(`/products/${category}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push(`/products/${category}`);
  };

  const hasFilters = currentSubcategory || currentSize;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        {hasFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Subcategory Filter */}
      {subcategories.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Type</h4>
          <div className="space-y-2">
            {subcategories.map((subcat) => (
              <label key={subcat} className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="subcategory"
                  checked={currentSubcategory === subcat}
                  onChange={() => updateFilter('subcategory', subcat)}
                  className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">
                  {subcat}
                </span>
              </label>
            ))}
            {currentSubcategory && (
              <button
                onClick={() => updateFilter('subcategory', null)}
                className="text-xs text-gray-500 hover:text-primary-600 mt-1"
              >
                Clear type filter
              </button>
            )}
          </div>
        </div>
      )}

      {/* Size Filter */}
      {sizes.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Size (sq mm)</h4>
          <select
            value={currentSize || ''}
            onChange={(e) => updateFilter('size', e.target.value || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All sizes</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size} sq mm
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Quick Actions */}
      <div className="pt-6 border-t border-gray-200">
        <a
          href="/contact"
          className="flex items-center justify-center w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors text-sm"
        >
          <svg
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
          Request Quote
        </a>
        <p className="text-xs text-gray-500 text-center mt-2">
          Get bulk pricing for your order
        </p>
      </div>
    </div>
  );
}
