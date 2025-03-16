"use client";

import { useState } from "react";
import Link from "next/link";
import { useScrollHeader } from "@/utils/hooks";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScrollHeader(10);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            HD
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/skills"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Yetenekler
            </Link>
            <Link
              href="/projects"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Projeler
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              İletişim
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="@md:hidden text-2xl"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="@md:hidden bg-[var(--background)] shadow-lg animate-fade-in">
          <nav className="container py-5 flex flex-col space-y-4">
            <Link
              href="/"
              className="hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ana Sayfa
            </Link>
            <Link
              href="/skills"
              className="hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Yetenekler
            </Link>
            <Link
              href="/projects"
              className="hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projeler
            </Link>
            <Link
              href="/contact"
              className="hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              İletişim
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 