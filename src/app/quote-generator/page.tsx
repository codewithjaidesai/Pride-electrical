import type { Metadata } from 'next';
import { QuoteWizard } from '@/components/quote';

export const metadata: Metadata = {
  title: 'Quote Generator | Pride Electrical - Get Instant Cable Accessory Quotes',
  description:
    'Generate instant quotes for cable lugs, glands, and accessories. Our smart quote engine calculates exact quantities based on your cable specifications using industry-standard formulas.',
  openGraph: {
    title: 'Quote Generator | Pride Electrical',
    description:
      'Get instant quotes for Dowell\'s cable accessories. Smart calculations for lugs, glands, and more.',
    type: 'website',
  },
};

export default function QuoteGeneratorPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Cable Accessories Quote Generator
            </h1>
            <p className="text-lg text-primary-100 mb-6">
              Get instant quotes for Dowell&apos;s cable lugs, glands, and accessories.
              Our smart engine calculates exact quantities based on your cable specifications.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                <svg
                  className="w-5 h-5 mr-2 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Automatic Core Multiplier
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                <svg
                  className="w-5 h-5 mr-2 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                3.5 Core Special Handling
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                <svg
                  className="w-5 h-5 mr-2 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Industry Standard Sizes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <QuoteWizard />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              How Our Quote Engine Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-700 font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Enter Cable Specs
                </h3>
                <p className="text-gray-600 text-sm">
                  Specify your cable size, number of cores, conductor type, and quantity.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-700 font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Smart Calculations
                </h3>
                <p className="text-gray-600 text-sm">
                  Our engine applies industry rules to calculate exact quantities for lugs and glands.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-700 font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Get Your Quote
                </h3>
                <p className="text-gray-600 text-sm">
                  Review the itemized quote with catalog numbers and submit for final pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Rules Info */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Built-in Industry Knowledge
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 text-primary-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Core Multiplier Formula
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Automatically calculates lug quantity based on number of cores:
                </p>
                <code className="block bg-gray-100 rounded p-2 text-sm font-mono">
                  Lugs = Quantity × Number of Cores
                </code>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 text-primary-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  3.5 Core Special Rule
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  For 3.5 core cables with reduced neutral:
                </p>
                <code className="block bg-gray-100 rounded p-2 text-sm font-mono">
                  3 full-size + 1 half-size lugs
                </code>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 text-primary-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Standard Hole Sizes
                </h3>
                <p className="text-gray-600 text-sm">
                  Industry-standard hole sizes are automatically suggested based on cable size.
                  For example, 185 sq mm cables typically use 16mm hole lugs.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 text-primary-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Size Alternatives
                </h3>
                <p className="text-gray-600 text-sm">
                  If exact size is unavailable, the system suggests the next size up for safe
                  electrical connections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help With Your Requirements?</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Our team of cable accessory experts is ready to help you find the right products.
            Contact us for bulk orders or special requirements.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-white text-primary-800 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Our Experts
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}
