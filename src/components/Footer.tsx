"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, MapPin, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: data.message || 'Mesajınız başarıyla gönderildi!'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Bir hata oluştu. Lütfen tekrar deneyin.'
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Ağ hatası oluştu. Lütfen tekrar deneyin.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer id="contact" className="bg-muted/30 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              İletişime Geçin
            </h2>
            <p className="text-xl text-muted-foreground">
              Yeni projeler, iş birlikleri veya sadece merhaba demek için!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 hover:shadow-elegant transition-all">
              <h3 className="text-2xl font-bold mb-6">İletişim Bilgileri</h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span><a href="mailto:huseyindol@gmail.com">huseyindol@gmail.com</a></span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span><a href="tel:+905445582825">+90 (544) 558 28 25</a></span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Maltepe, İstanbul, Türkiye</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-4">Sosyal Medya</h4>
                <div className="flex space-x-4">
                  <Link href="https://github.com/huseyindol" target="_blank" className="hover:bg-primary hover:text-white">
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link href="https://www.linkedin.com/in/huseyindol/" target="_blank" className="hover:bg-primary hover:text-white">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link href="mailto:huseyindol@gmail.com" className="hover:bg-primary hover:text-white">
                    <Mail className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-elegant transition-all">
              <h3 className="text-2xl font-bold mb-6">Hızlı Mesaj</h3>

              {status.type && (
                <div className={`p-4 rounded-md mb-4 ${status.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Adınız"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="w-full p-3 rounded-md border border-input bg-background disabled:opacity-50"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="E-posta adresiniz"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="w-full p-3 rounded-md border border-input bg-background disabled:opacity-50"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Mesajınız"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="w-full p-3 rounded-md border border-input bg-background resize-none disabled:opacity-50"
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full hero-gradient text-white disabled:opacity-50"
                >
                  {isLoading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                </Button>
              </form>
            </Card>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              © {currentYear} Hüseyin DOL. Made with
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              using React & TypeScript & Spring Boot
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}