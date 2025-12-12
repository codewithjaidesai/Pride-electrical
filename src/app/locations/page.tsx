import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Locations | Pride Electrical - Hyderabad & Mumbai',
  description:
    'Visit Pride Electrical offices in Hyderabad (Head Office) and Mumbai. India\'s largest Dowell\'s cable accessories dealer with pan-India delivery.',
  openGraph: {
    title: 'Our Locations | Pride Electrical',
    description:
      'Pride Electrical offices in Hyderabad and Mumbai. Pan-India delivery of cable accessories.',
    type: 'website',
  },
};

const locations = [
  {
    city: 'Hyderabad',
    state: 'Telangana',
    type: 'Head Office',
    slug: 'hyderabad',
    description:
      'Our headquarters and main warehouse serving South & Central India',
    highlights: [
      'Complete Dowell\'s product inventory',
      'Same-day dispatch for local orders',
      'Technical support team',
      'Bulk order processing',
    ],
  },
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    type: 'Branch Office',
    slug: 'mumbai',
    description: 'Serving Western India with quick turnaround times',
    highlights: [
      'Strategic location for West India coverage',
      'Fast delivery to Maharashtra & Gujarat',
      'Local sales support',
      'Project consultation',
    ],
  },
];

export default function LocationsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Locations
            </h1>
            <p className="text-lg text-primary-100">
              Strategically located to serve customers across India. Visit our offices
              for product consultations or contact us for pan-India delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="block"
              >
                <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow h-full">
                  <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                    </div>
                    <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                      {location.type}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {location.city}
                    </h2>
                    <p className="text-gray-500 mb-4">{location.state}</p>
                    <p className="text-gray-600 mb-4">{location.description}</p>
                    <ul className="space-y-2">
                      {location.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <svg
                            className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
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
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-center text-primary-600 font-medium">
                      View Details
                      <svg
                        className="w-5 h-5 ml-1"
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
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Map Section */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pan-India Delivery
            </h2>
            <p className="text-gray-600 mb-8">
              While our offices are in Hyderabad and Mumbai, we deliver Dowell&apos;s
              cable accessories across India. Our logistics network ensures quick
              delivery to all major cities and industrial hubs.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-primary-600 mb-2">2-3</div>
                <p className="text-gray-600">Days to Metro Cities</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-primary-600 mb-2">4-5</div>
                <p className="text-gray-600">Days to Tier 2/3 Cities</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
                <p className="text-gray-600">Cities Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Get in touch with our team or use our Quote Generator for instant pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote-generator"
              className="px-6 py-3 bg-accent-500 text-white rounded-lg font-semibold hover:bg-accent-600 transition-colors"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-primary-800 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
