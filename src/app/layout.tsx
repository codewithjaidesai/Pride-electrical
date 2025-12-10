import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Pride Electrical - India's Largest Dowell's Dealer | Cable Lugs & Glands",
    template: "%s | Pride Electrical",
  },
  description:
    "Pride Electrical is India's largest authorized dealer of Dowell's cable accessories. Shop copper lugs, aluminium lugs, cable glands, and crimping tools. Offices in Hyderabad & Mumbai.",
  keywords: [
    "Dowell's dealer",
    "cable lugs",
    "copper lugs",
    "aluminium lugs",
    "cable glands",
    "electrical accessories",
    "Polycab",
    "Hyderabad",
    "Mumbai",
    "India",
  ],
  authors: [{ name: "Pride Electrical" }],
  creator: "Pride Electrical",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Pride Electrical",
    title: "Pride Electrical - India's Largest Dowell's Dealer",
    description:
      "Authorized dealer of Dowell's cable accessories. Copper lugs, aluminium lugs, cable glands & more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pride Electrical - India's Largest Dowell's Dealer",
    description:
      "Authorized dealer of Dowell's cable accessories. Copper lugs, aluminium lugs, cable glands & more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
