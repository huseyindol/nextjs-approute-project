"use client";

import { useRef } from "react";
import { useScrollAnimation } from "@/utils/hooks";
import { skillsData } from "@/data/mockData";

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  useScrollAnimation();

  return (
    <section id="skills" className="section" ref={skillsRef}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl @md:text-4xl font-bold mb-4 animate-on-scroll">
            Yeteneklerim
          </h2>
          <div className="w-20 h-1 bg-[var(--primary)] mx-auto animate-on-scroll"></div>
          <p className="mt-6 max-w-2xl mx-auto animate-on-scroll">
            Yıllar içinde edindiğim teknik beceriler ve kullandığım teknolojiler.
            Sürekli kendimi geliştirmeye ve yeni teknolojileri öğrenmeye devam ediyorum.
          </p>
        </div>

        <div className="grid grid-cols-1 @md:grid-cols-3 gap-8">
          {skillsData.map((category, index) => (
            <div
              key={index}
              className="bg-[var(--muted)] p-6 rounded-lg shadow-md animate-on-scroll"
            >
              <h3 className="text-xl font-bold mb-4 text-center">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-[var(--primary)] h-2.5 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 @md:grid-cols-4 gap-6 text-center animate-on-scroll">
          <div className="card">
            <div className="text-4xl font-bold text-[var(--primary)]">50+</div>
            <div className="mt-2">Tamamlanan Proje</div>
          </div>
          <div className="card">
            <div className="text-4xl font-bold text-[var(--primary)]">30+</div>
            <div className="mt-2">Mutlu Müşteri</div>
          </div>
          <div className="card">
            <div className="text-4xl font-bold text-[var(--primary)]">5+</div>
            <div className="mt-2">Yıl Deneyim</div>
          </div>
          <div className="card">
            <div className="text-4xl font-bold text-[var(--primary)]">15+</div>
            <div className="mt-2">Teknoloji</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 