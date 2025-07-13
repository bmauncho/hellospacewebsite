"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/About", label: "About" },
    { href: "/Services", label: "Services" },
    { href: "/Portfolio", label: "Portfolio" },
    { href: "/Contact", label: "Contact" },
    { href: "/Shop", label: "Shop" },
  ];
  return (
    <div className="sticky top-0 z-50 w-full border-b border-[#e2ded9] bg-[#f8f5f2]/80 backdrop-blur-sm">
      <div className="container p-2 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/hello-space-logo.png"
            alt="Hello Space Logo"
            width={40}
            height={40}
          />
        </Link>
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-[#6b6963]">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-[#3c3a36]",
                pathname === item.href && "text-[#6b6963] font-bold"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/Consultation">
            <button className="hidden md:flex rounded-xl bg-[#f8f5f2] px-4 py-2 transition-colors hover:bg-[#6b6963] hover:text-white ">
              Book Consultation
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
