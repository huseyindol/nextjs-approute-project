'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useEffect, useState } from 'react'
import CookieContext, { initGlobalCookieStore } from '../context/CookieContext'
import { ThemeProvider } from './ThemeProvider'

export default function Providers({
  children,
  cookiesData,
}: {
  children: React.ReactNode
  cookiesData: Record<string, string>
}) {
  const [cookies, setCookies] = useState<Record<string, string>>(cookiesData)
  const [queryClient] = useState(() => new QueryClient())

  const updateCookie = (name: string, value: string) => {
    setCookies(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  // Initialize global cookie store for non-React files (like fetcher.ts)
  // IMPORTANT: cookies dependency'si gerekli çünkü state değiştiğinde globalCookieStore'u güncellemeli
  useEffect(() => {
    initGlobalCookieStore({ cookies, updateCookie })
  }, [cookies])

  return (
    <CookieContext.Provider value={{ cookies, updateCookie }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </CookieContext.Provider>
  )
}
