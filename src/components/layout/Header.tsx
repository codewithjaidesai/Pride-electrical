'use client';

import Link from 'next/link';
import { useState } from 'react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Quote Generator', href: '/quote-generator' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary-700 sticky top-0 z-50 shadow-lg">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-accent-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">PE</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-white font-bold text-lg">Pride Electrical</span>
                <span className="block text-primary-400 text-xs">Authorized Dowell&apos;s Dealer</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-100 hover:text-accent-400 transition-colors text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white hover:text-accent-400 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-600">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-100 hover:text-accent-400 hover:bg-primary-800 px-3 py-2 rounded-lg transition-colors text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg text-base font-semibold transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
