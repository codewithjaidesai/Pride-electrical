import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Pride Electrical - India\'s largest authorized dealer of Dowell\'s cable accessories. Our story, mission, and commitment to quality.',
};

const values = [
  {
    title: 'Quality First',
    description: 'We only stock genuine Dowell\'s products backed by Polycab\'s quality assurance.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    title: 'Customer Focus',
    description: 'Expert guidance to help you select the right products for your specific needs.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: 'Reliability',
    description: 'Consistent supply chain with offices in Hyderabad and Mumbai for pan-India delivery.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    title: 'Technical Expertise',
    description: 'Deep understanding of cable accessories and electrical industry requirements.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
];

const stats = [
  { label: 'Products', value: '2500+' },
  { label: 'Cities Served', value: '100+' },
  { label: 'Offices', value: '2' },
  { label: 'Client Satisfaction', value: '99%' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Pride Electrical</h1>
            <p className="text-xl text-gray-300">
              India&apos;s largest authorized dealer of Dowell&apos;s cable accessories,
              serving electrical contractors and industries with quality products and expert support.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>
                  Pride Electrical was founded with a clear mission: to be the most trusted source
                  for Dowell&apos;s cable accessories in India. As an authorized dealer, we bring
                  genuine products directly from Dowell&apos;s, a renowned Polycab subsidiary known
                  for manufacturing high-quality electrical accessories.
                </p>
                <p>
                  Today, we proudly serve as India&apos;s largest Dowell&apos;s dealer, with a
                  comprehensive catalog of over 2,500 products including cable lugs, cable glands,
                  connectors, and crimping tools.
                </p>
                <p>
                  With strategically located offices in Hyderabad and Mumbai, we ensure timely
                  delivery and local support for customers across the country.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-4xl font-bold text-primary-700 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dowell's Partnership Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-dowells-red/10 text-dowells-red px-4 py-2 rounded-full text-sm font-medium mb-6">
              Authorized Partner
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Proud Dowell&apos;s Dealer
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Dowell&apos;s, a subsidiary of Polycab India Limited, is a leading manufacturer of
              cable lugs, glands, and electrical connectors. As their authorized dealer, we ensure
              that every product we supply meets the highest quality standards and comes with
              genuine warranty support.
            </p>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Our Product Categories</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Copper Lugs
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Aluminium Lugs
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Bi-metallic Lugs
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Cable Glands
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Connectors
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Crimping Tools
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Pride Electrical
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 text-primary-600 rounded-xl mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section (Placeholder) */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the experts behind Pride Electrical
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 lg:p-12 text-center max-w-2xl mx-auto">
            <div className="text-gray-500 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <p className="text-gray-600">
              Team information coming soon. Our dedicated team of electrical experts is ready to assist you
              with product selection, technical support, and all your cable accessory needs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Get in touch with our team for product inquiries, bulk orders, or technical support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
