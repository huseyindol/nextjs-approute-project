"use client";

import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";
import { personalData } from "@/data/mockData";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--muted)] py-12">
      <div className="container">
        <div className="grid grid-cols-1 @md:grid-cols-4 gap-8">
          <div className="@md:col-span-2">
            <Link href="/" className="text-2xl font-bold mb-4 block">
              {personalData.name}
            </Link>
            <p className="mb-6 max-w-md">
              {personalData.bio}
            </p>
            <div className="flex space-x-4">
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
                  case "instagram":
                    Icon = FaInstagram;
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
                    className="bg-[var(--background)] p-3 rounded-full text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white transition-colors"
                    aria-label={social.platform}
                  >
                    <Icon className="text-xl" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#about"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Hakkımda
                </Link>
              </li>
              <li>
                <Link
                  href="/#skills"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Yeteneklerim
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Projelerim
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${personalData.email}`}
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  {personalData.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${personalData.phone}`}
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  {personalData.phone}
                </a>
              </li>
              <li>{personalData.location}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)] mt-12 pt-6 text-center">
          <p>
            &copy; {currentYear} {personalData.name}. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 