'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'

/**
 * Admin panel için tema hook'u
 * next-themes'den gelen tema bilgisini kullanır
 * Hydration sorunlarını önlemek için mounted state kontrolü yapar
 */
export function useAdminTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const mountedRef = useRef(false)

  // Hydration mismatch önlemek için - useLayoutEffect pattern
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      setMounted(true)
    }
  }, [])

  const isDarkMode = mounted ? resolvedTheme === 'dark' : true // SSR'da dark varsayalım

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return {
    theme,
    resolvedTheme,
    isDarkMode,
    mounted,
    setTheme,
    toggleTheme,
  }
}
