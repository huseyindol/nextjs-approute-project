"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-gradient">
          Hüseyin DOL
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            Hakkında
          </Link>
          <Link href="#skills" className="text-muted-foreground hover:text-primary transition-colors">
            Yetenekler
          </Link>
          <Link href="#experience" className="text-muted-foreground hover:text-primary transition-colors">
            Deneyim
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="#about" className="w-full">
                  Hakkında
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#skills" className="w-full">
                  Yetenekler
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#experience" className="w-full">
                  Deneyim
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}