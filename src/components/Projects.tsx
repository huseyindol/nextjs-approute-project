"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useScrollAnimation } from "@/utils/hooks";
import { projectsData } from "@/data/mockData";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const projectsRef = useRef<HTMLDivElement>(null);
  useScrollAnimation();

  const filteredProjects =
    filter === "all"
      ? projectsData
      : projectsData.filter((project) => project.category === filter);

  return (
    <section id="projects" className="section bg-[var(--muted)]" ref={projectsRef}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl @md:text-4xl font-bold mb-4 animate-on-scroll">
            Projelerim
          </h2>
          <div className="w-20 h-1 bg-[var(--primary)] mx-auto animate-on-scroll"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-on-scroll">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full ${filter === "all"
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--background)] hover:bg-[var(--primary-light)]"
              } transition-colors`}
          >
            Tümü
          </button>
          <button
            onClick={() => setFilter("web")}
            className={`px-4 py-2 rounded-full ${filter === "web"
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--background)] hover:bg-[var(--primary-light)]"
              } transition-colors`}
          >
            Web
          </button>
          <button
            onClick={() => setFilter("mobile")}
            className={`px-4 py-2 rounded-full ${filter === "mobile"
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--background)] hover:bg-[var(--primary-light)]"
              } transition-colors`}
          >
            Mobil
          </button>
          <button
            onClick={() => setFilter("design")}
            className={`px-4 py-2 rounded-full ${filter === "design"
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--background)] hover:bg-[var(--primary-light)]"
              } transition-colors`}
          >
            Tasarım
          </button>
        </div>

        <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[var(--background)] rounded-lg overflow-hidden shadow-lg animate-on-scroll"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-[var(--muted-foreground)] mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-[var(--primary-light)] text-[var(--primary)] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium hover:text-[var(--primary)]"
                  >
                    <FaExternalLinkAlt /> Demo
                  </a>
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium hover:text-[var(--primary)]"
                  >
                    <FaGithub /> Kod
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 