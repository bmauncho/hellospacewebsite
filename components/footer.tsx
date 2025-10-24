import Link from "next/link";
import Image from "next/image";
import { NewsletterForm } from "@/components/newsletter-form";
import { AccentDivider } from "@/components/accent-divider";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo/hello-space-logo.png"
                alt="Hello Space Logo"
                width={40}
                height={40}
              />
              <h4 className="font-serif text-lg font-medium text-foreground">
                Hello Space
              </h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Innovative interior design solutions and quality furniture for
              modern living spaces.
            </p>
            <AccentDivider size="sm" />
          </div>
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium text-foreground">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/Services"
                  className="transition-colors hover:text-brand-accent"
                >
                  Interior Design Consultation
                </Link>
              </li>
              <li>
                <Link
                  href="/Services"
                  className="transition-colors hover:text-brand-accent"
                >
                  Furniture Selection
                </Link>
              </li>
              <li>
                <Link
                  href="/Services"
                  className="transition-colors hover:text-brand-accent"
                >
                  Space Planning
                </Link>
              </li>
              <li>
                <Link
                  href="/Services"
                  className="transition-colors hover:text-brand-accent"
                >
                  Project Management
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium text-foreground">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/About"
                  className="transition-colors hover:text-brand-accent"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/Portfolio"
                  className="transition-colors hover:text-brand-accent"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/shophellospace?igsh=djdvYmZybmFjaWdr"
                  className="transition-colors hover:text-brand-accent"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/Contact"
                  className="transition-colors hover:text-brand-accent"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium text-foreground">
              Newsletter
            </h4>
            <p className="text-sm text-muted-foreground">
              Sign up for our newsletter to receive updates and exclusive
              offers.
            </p>
            <NewsletterForm className="max-w-sm" />
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <div className="flex justify-center space-x-6 mb-4">
            {/* instagram */}
            <Link
              href="https://www.instagram.com/_hellospace?igsh=MXZnMjBrZXAwZWJ6bg%3D%3D&utm_source=qr "
              className="text-muted-foreground hover:text-brand-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
            {/* facebook
            <Link
              href="#"
              className="text-muted-foreground hover:text-brand-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            {/* twitter */}
            {/* <Link
              href="#"
              className="text-muted-foreground hover:text-brand-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link> */}
          </div>
          <p>© {new Date().getFullYear()} Hello Space. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
