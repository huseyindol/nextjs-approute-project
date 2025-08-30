'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-primary transition-all hover:text-white"
      >
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-primary relative transition-all hover:text-white"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <Sun
        className={`h-5 w-5 transition-all duration-300 ease-in-out ${
          isDark
            ? 'scale-0 rotate-90 opacity-0'
            : 'scale-100 rotate-0 opacity-100'
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ease-in-out ${
          isDark
            ? 'scale-100 rotate-0 opacity-100'
            : 'scale-0 -rotate-90 opacity-0'
        }`}
      />
    </Button>
  )
}
