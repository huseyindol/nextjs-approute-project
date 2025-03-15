"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
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
              {personalData.socialLinks.map((social, index) => {
                let Icon;
                switch (social.platform) {
                  case "github":
                    Icon = FaGithub;
                    break;
                  case "linkedin":
                    Icon = FaLinkedinIn;
                    break;
                  case "twitter":
                    Icon = FaTwitter;
                    break;
                  default:
                    Icon = FaGithub;
                }

                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                    aria-label={social.platform}
                  >
                    <Icon className="text-xl" />
                  </a>
                );
              })}
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