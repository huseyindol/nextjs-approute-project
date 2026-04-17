'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { sendGTMEvent } from '@next/third-parties/google'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const navLinks = [
  { href: '/about', label: 'Hakkında' },
  { href: '/skills', label: 'Yetenekler' },
  { href: '/experience', label: 'Deneyim' },
  { href: '/projects', label: 'Projeler' },
  { href: '/blog', label: 'Makalelerim' },
]

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-border/60 bg-background/90 border-b shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() =>
            sendGTMEvent({ virtual: '/', event: 'buttonClick', target: 'home' })
          }
        >
          <Image
            src="/assets/img/huseyindol.png"
            alt="Hüseyin DOL"
            width={40}
            height={40}
            className="ring-primary/20 rounded-full ring-2"
          />
          <span
            className={`text-lg font-bold transition-colors ${
              scrolled ? 'text-foreground' : 'text-white'
            }`}
          >
            Hüseyin DOL
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() =>
                sendGTMEvent({
                  virtual: link.href,
                  event: 'buttonClick',
                  target: link.href.slice(1),
                })
              }
              className={`relative rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? scrolled
                    ? 'text-primary'
                    : 'text-white'
                  : scrolled
                    ? 'text-muted-foreground hover:text-foreground'
                    : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </Link>
          ))}

          <div className="ml-2 flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="mailto:huseyindol@gmail.com"
              className="ml-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:scale-105 hover:shadow-blue-500/40"
            >
              İletişime Geç
            </Link>
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(v => !v)}
            aria-label="Menü"
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              scrolled
                ? 'bg-muted text-foreground hover:bg-accent'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="bg-background/95 border-b border-border px-6 pb-6 pt-2 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="mailto:huseyindol@gmail.com"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                İletişime Geç
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
