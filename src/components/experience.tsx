"use client"

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    id: 1,
    company: "Hangikredi",
    position: "Senior Frontend Developer & Team Lead",
    period: "Ekim 2023 - Günümüz",
    location: "İstanbul",
    industry: "Fintech",
    description: "Türkiye'nin en büyük karşılaştırmalı finansal ürünler sunan şirketi. React ve Next.js kullanarak fintech uygulamaları geliştiriyorum. bulunduğum squadın developer ekibine liderlik ediyorum.",
    technologies: ["React", "Next.js", "React Query", "TypeScript", "C# .Net", "MVC Razor", "SCSS", "Context API", "SignalR", "Tailwind CSS", "CSR & SSR Rendering", "Docker", "Jenkins", "CI/CD", "Gulp"],
    achievements: [
      "40% performans artışı sağlayan optimizasyonlar",
      "NPM paketi kurulumu",
      "SEO, Analytics ve Datalayer entegrasyonları",
      "CI/CD Jenkins ve Docker kullanarak pipeline kurulumu",
      "Junior developer mentorluğu"
    ]
  },
  {
    id: 2,
    company: "Venhancer",
    position: "Sr. Frontend Developer",
    period: "Mayıs 2023 - Ekim 2023",
    location: "İstanbul",
    industry: "Fintech",
    description: "Fibabanka'nın Yaklaşan Ödemeler uygulaması, Müşteri kampanya yönetim ekranı ve şikayet yönetim ekranı geliştirmelerinde yer aldım.",
    technologies: ["React", "Redux", "TypeScript", "SCSS", "Context API"],
    achievements: [
      "Müşteri kampanya yönetim ekranı geliştirme",
      "Şikayet yönetim ekranı geliştirme",
      "Yaklaşan Ödemeler uygulaması geliştirme"
    ]
  },
  {
    id: 3,
    company: "Azerion Turkey",
    position: "Full Stack Developer",
    period: "Mart 2022 - Mayıs 2023",
    location: "İstanbul",
    industry: "Media",
    description: "Kullanıcıların oyun oynayabildiği, oyunlara puan verebildiği, yorum yapabildiği ve gerçek zamanlı sohbetle iletişim kurabildiği çok oyunculu bir oyun platformu ve medya gruplarına ait whitelabel oyun portalları geliştirmelerinde yer aldım.",
    technologies: ["JavaScript", "jQuery", "Bootstrap", "React", "Redux", "TypeScript", "SCSS", "Context API", "GraphQL", "Express", "Socket.io", "Docker", "Jenkins", "CI/CD"],
    achievements: [
      "Medya gruplarına ait oyun portalları geliştirme",
      "SEO optimizasyonları",
      "Performans optimizasyonları, Code splitting, Lazy loading, Image optimization, Bundling optimization...",
    ]
  },
  {
    id: 4,
    company: "Defacto",
    position: "Sr. Frontend Developer",
    period: "Kasım 2020 - Mart 2022",
    location: "İstanbul",
    industry: "E-commerce",
    description: "Türkiye'nin en büyük e-ticaret platformlarından birisi olan Defacto'nun frontend geliştirme mimarısınde yer aldım.",
    technologies: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Redux", "SCSS", "Context API", "Angular V6", "Webpack"],
    achievements: [
      "Frontend mimarisinde mobile ve desktop uygulamasını responsive olarak yönetilmesi",
      "SEO, Analytics ve Datalayer entegrasyonları",
      "Performans optimizasyonları (Code splitting, Lazy loading, Image optimization, Bundling optimization...)",
    ]
  },
  {
    id: 5,
    company: "Nuevo Softwarehouse",
    position: "Frontend Developer",
    period: "Nisan 2019 - Ekim 2020",
    location: "İstanbul",
    industry: "Agency",
    description: "Nuevo Softwarehouse'un frontend geliştirme ekibine katıldım. Junior developer mentorluğu yapıyordum. TCCB, OTİ, ATASUN ve BITTRT gibi büyük ölçekli firmaların frontend geliştirmelerinde yer aldım.",
    technologies: ["React", "Redux", "TypeScript", "SCSS", "Context API", "Angular V6", "Webpack", "Gulp"],
    achievements: [
      "Junior developer mentorluğu",
      "Performans optimizasyonları (Code splitting, Lazy loading, Image optimization, Bundling optimization...)",
    ]
  }
];

const industries = ["Tümü", "Fintech", "E-commerce", "Agency", "Media"];

export default function Experience() {
  const [selectedIndustry, setSelectedIndustry] = useState("Tümü");

  const filteredExperiences = selectedIndustry === "Tümü"
    ? experiences
    : experiences.filter(exp => exp.industry === selectedIndustry);

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Profesyonel Deneyim
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Çeşitli sektörlerde edindiğim deneyimler ve başarılar
          </p>

          {/* Industry Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <Button
                key={industry}
                variant={selectedIndustry === industry ? "default" : "outline"}
                onClick={() => setSelectedIndustry(industry)}
                className="transition-all"
              >
                {industry}
              </Button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {filteredExperiences.map((exp, index) => (
            <Card
              key={exp.id}
              className="p-8 hover:shadow-elegant transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    {exp.position}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      <span className="font-semibold">{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-4">
                    {exp.industry}
                  </Badge>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {exp.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Teknolojiler</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="bg-skill-bg">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Başlıca Başarılar</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}