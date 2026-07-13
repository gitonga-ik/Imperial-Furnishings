"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Visit Us", href: "/visit" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-[#ede2d0] py-4 relative z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Imperial Furnishings Logo"
            height={50}
            width={160}
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link-underline text-sm ${
                pathname === href ? "after:w-full" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <button
          className="lg:hidden text-3xl text-[#2b2b2b] bg-transparent border-none cursor-pointer"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#ede2d0] flex flex-col items-center gap-5 py-6 shadow-md">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="nav-link-underline text-lg"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
