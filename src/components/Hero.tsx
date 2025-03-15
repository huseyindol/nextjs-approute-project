"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollAnimation } from "@/utils/hooks";
import { personalData } from "@/data/mockData";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useScrollAnimation();

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center pt-20"
    >
      <div className="container">
        <div className="grid grid-cols-1 @md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[var(--primary)] font-medium mb-4 animate-on-scroll">
              Merhaba, ben
            </p>
            <h1 className="text-4xl @md:text-5xl @lg:text-6xl font-bold mb-6 animate-on-scroll">
              {personalData.name}
            </h1>
            <h2 className="text-2xl @md:text-3xl text-[var(--secondary)] mb-6 animate-on-scroll">
              {personalData.title}
            </h2>
            <p className="text-lg mb-8 animate-on-scroll">
              {personalData.bio}
            </p>
            <div className="flex flex-wrap gap-4 animate-on-scroll">
              <Link href="#contact" className="btn btn-primary">
                İletişime Geç
              </Link>
              <Link href="#projects" className="btn btn-outline">
                Projelerimi Gör
              </Link>
            </div>
            <div className="flex space-x-6 mt-8 animate-on-scroll">
              <a
                href={personalData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                aria-label="GitHub"
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
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a
                href={personalData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                aria-label="LinkedIn"
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
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href={personalData.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                aria-label="Twitter"
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
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="relative animate-on-scroll">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-[var(--primary)] rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-4/5 rounded-full overflow-hidden border-4 border-[var(--primary)] relative">
                  <Image
                    src="/profile.jpg"
                    alt={personalData.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 