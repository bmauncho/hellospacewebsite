import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "./client-layout";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: "Hello Space – Innovative Interior Design & Quality Furniture",
    template: "%s | Hello Space",
  },
  description: "Discover Hello Space – your destination for expert interior design consultations, stylish furniture, and inspiring portfolios. Book your consultation today!",
  keywords: ["interior design", "furniture", "home decor", "interior styling", "interior consultant"],
  authors: [{ name: "Hello Space" }],
  openGraph: {
    title: "Hello Space – Innovative Interior Design & Quality Furniture",
    description: "Discover Hello Space – your destination for expert interior design consultations, stylish furniture, and inspiring portfolios.",
    url: "https://hellospace.vercel.app",
    siteName: "Hello Space",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hello Space – Innovative Interior Design & Quality Furniture",
    description: "Discover Hello Space – your destination for expert interior design consultations, stylish furniture, and inspiring portfolios.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#f8f5f2',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#f8f5f2',
  viewportFit: 'cover',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
        <Footer />
      </body>
    </html>
  );
}
