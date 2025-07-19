import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./client-layout";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Hello Space – Innovative Interior Design & Quality Furniture",
  description:
    "Discover Hello Space – your destination for expert interior design consultations, stylish furniture, and inspiring portfolios. Book your consultation today!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
        <Footer />
      </body>
    </html>
  );
}
