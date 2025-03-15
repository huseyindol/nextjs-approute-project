"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/utils/hooks";
import { personalData } from "@/data/mockData";

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  useScrollAnimation();

  return (
    <section id="about" className="section bg-[var(--muted)]" ref={aboutRef}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl @md:text-4xl font-bold mb-4 animate-on-scroll">
            Hakkımda
          </h2>
          <div className="w-20 h-1 bg-[var(--primary)] mx-auto animate-on-scroll"></div>
        </div>

        <div className="grid grid-cols-1 @md:grid-cols-2 gap-12 items-center">
          <div className="relative animate-on-scroll">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute -inset-4 rounded-lg bg-[var(--primary)] opacity-10"></div>
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src="/about.jpg"
                  alt={personalData.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--primary)] rounded-lg flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-3xl font-bold">{personalData.experience}</div>
                  <div className="text-sm">Yıl Deneyim</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 animate-on-scroll">
              Frontend Developer & UI/UX Tasarımcı
            </h3>
            <p className="mb-4 animate-on-scroll">
              Merhaba! Ben {personalData.name}, {personalData.location}'da yaşayan tutkulu bir frontend geliştirici ve UI/UX tasarımcıyım.
              Modern web teknolojileri ile kullanıcı dostu, performanslı ve estetik web uygulamaları geliştiriyorum.
            </p>
            <p className="mb-6 animate-on-scroll">
              {personalData.longBio}
            </p>

            <div className="grid grid-cols-1 @sm:grid-cols-2 gap-4 mb-6">
              <div className="animate-on-scroll">
                <h4 className="font-bold mb-2">İsim:</h4>
                <p>{personalData.name}</p>
              </div>
              <div className="animate-on-scroll">
                <h4 className="font-bold mb-2">E-posta:</h4>
                <p>{personalData.email}</p>
              </div>
              <div className="animate-on-scroll">
                <h4 className="font-bold mb-2">Konum:</h4>
                <p>{personalData.location}</p>
              </div>
              <div className="animate-on-scroll">
                <h4 className="font-bold mb-2">Freelance:</h4>
                <p>{personalData.isFreelance ? "Müsait" : "Müsait Değil"}</p>
              </div>
            </div>

            <div className="animate-on-scroll">
              <a
                href="/cv.pdf"
                download
                className="btn btn-primary inline-block"
              >
                CV İndir
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 