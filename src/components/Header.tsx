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
        ? "bg-[var(--background)] shadow-md py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Hüseyin<span className="text-[var(--primary)]">DOL</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden @md:flex items-center space-x-8">
          <Link
            href="#home"
            className="hover:text-[var(--primary)] transition-colors"
          >
            Ana Sayfa
          </Link>
          <Link
            href="#about"
            className="hover:text-[var(--primary)] transition-colors"
          >
            Hakkımda
          </Link>
          <Link
            href="#skills"
            className="hover:text-[var(--primary)] transition-colors"
          >
            Yetenekler
          </Link>
          <Link
            href="#projects"
            className="hover:text-[var(--primary)] transition-colors"
          >
            Projeler
          </Link>
          <Link
            href="#contact"
            className="hover:text-[var(--primary)] transition-colors"
          >
            İletişim
          </Link>
          <Link
            href="#contact"
            className="btn btn-primary"
          >
            CV İndir
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="@md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="@md:hidden bg-[var(--background)] shadow-lg animate-fade-in">
          <nav className="container py-5 flex flex-col space-y-4">
            <Link
              href="#home"
              className="hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ana Sayfa
            </Link>
            <Link
              href="#about"
              className="hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hakkımda
            </Link>
            <Link
              href="#skills"
              className="hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Yetenekler
            </Link>
            <Link
              href="#projects"
              className="hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projeler
            </Link>
            <Link
              href="#contact"
              className="hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              İletişim
            </Link>
            <Link
              href="#contact"
              className="btn btn-primary inline-block w-fit"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              CV İndir
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 