'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by catalog number, size, or product name..."
          className="w-full px-6 py-4 pr-14 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          aria-label="Search"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        <span className="text-sm text-gray-500">Popular:</span>
        {['CUS-17', '70 sq mm', 'Cable Gland', 'Crimping Tool'].map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => {
              setQuery(term);
              router.push(`/products/search?q=${encodeURIComponent(term)}`);
            }}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </form>
  );
}
