import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SSG Examples | Next.js App Router',
  description:
    'Static Site Generation (SSG) ve Incremental Static Regeneration (ISR) örnekleri',
  keywords: [
    'Next.js',
    'SSG',
    'ISR',
    'Static Site Generation',
    'React',
    'TypeScript',
  ],
  authors: [{ name: 'Next.js Developer' }],
  openGraph: {
    title: 'SSG Examples | Next.js App Router',
    description:
      'Static Site Generation (SSG) ve Incremental Static Regeneration (ISR) örnekleri',
    type: 'website',
    locale: 'tr_TR',
  },
}

interface ExampleLayoutProps {
  children: React.ReactNode
}

export default function ExampleLayout({ children }: ExampleLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation Breadcrumb */}
      <nav className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="/"
              className="transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              Ana Sayfa
            </Link>
            <span>/</span>
            <Link
              href="/example"
              className="transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              SSG Examples
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer Information */}
      <footer className="mt-16 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                SSG (Static Site Generation)
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Build time&apos;da HTML oluşturma</li>
                <li>• Maksimum performans</li>
                <li>• SEO dostu</li>
                <li>• CDN cache&apos;leme</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                ISR (Incremental Static Regeneration)
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Background&apos;da güncelleme</li>
                <li>• Fresh content</li>
                <li>• Stale-while-revalidate</li>
                <li>• Optimal performance</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                generateStaticParams
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Dinamik rota oluşturma</li>
                <li>• Build time path generation</li>
                <li>• TypeScript desteği</li>
                <li>• Nested routes</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 text-center dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Next.js App Router ile modern SSG implementasyonları
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
