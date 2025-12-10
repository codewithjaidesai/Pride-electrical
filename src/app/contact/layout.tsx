import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Pride Electrical - India\'s largest Dowell\'s dealer. Contact our offices in Hyderabad and Mumbai for product inquiries, quotes, and technical support.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
