'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { sendGTMEvent } from '@next/third-parties/google'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-background/80 fixed top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-gradient text-xl font-bold">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2"
            onClick={() =>
              sendGTMEvent({
                virtual: '/',
                event: 'buttonClick',
                target: 'home',
              })
            }
          >
            <Image
              src="/assets/img/huseyindol.png"
              alt=""
              width={52}
              height={52}
            />
            <span className="text-2xl font-bold">Hüseyin DOL</span>
          </Link>
        </div>

        <nav className="hidden items-center space-x-6 md:flex">
          <Link
            href="#about"
            className="text-muted-foreground hover:text-primary transition-colors"
            onClick={() =>
              sendGTMEvent({
                virtual: '#about',
                event: 'buttonClick',
                target: 'about',
              })
            }
          >
            Hakkında
          </Link>
          <Link
            href="#skills"
            className="text-muted-foreground hover:text-primary transition-colors"
            onClick={() =>
              sendGTMEvent({
                virtual: '#skills',
                event: 'buttonClick',
                target: 'skills',
              })
            }
          >
            Yetenekler
          </Link>
          <Link
            href="#experience"
            className="text-muted-foreground hover:text-primary transition-colors"
            onClick={() =>
              sendGTMEvent({
                virtual: '#experience',
                event: 'buttonClick',
                target: 'experience',
              })
            }
          >
            Deneyim
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile menu */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {isOpen ? (
                  <X id="close-icon" className="h-6 w-6" />
                ) : (
                  <Menu id="menu-icon" className="h-6 w-6" />
                )}
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
  )
}
