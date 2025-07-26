import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, MapPin, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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

              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Adınız"
                    className="w-full p-3 rounded-md border border-input bg-background"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="w-full p-3 rounded-md border border-input bg-background"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Mesajınız"
                    rows={4}
                    className="w-full p-3 rounded-md border border-input bg-background resize-none"
                  ></textarea>
                </div>
                <Button className="w-full hero-gradient text-white">
                  Mesaj Gönder
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