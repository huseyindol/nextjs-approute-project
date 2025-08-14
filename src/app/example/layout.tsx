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
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="/"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Ana Sayfa
            </Link>
            <span>/</span>
            <Link
              href="/example"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              SSG Examples
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer Information */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                SSG (Static Site Generation)
              </h3>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                <li>• Build time&apos;da HTML oluşturma</li>
                <li>• Maksimum performans</li>
                <li>• SEO dostu</li>
                <li>• CDN cache&apos;leme</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                ISR (Incremental Static Regeneration)
              </h3>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                <li>• Background&apos;da güncelleme</li>
                <li>• Fresh content</li>
                <li>• Stale-while-revalidate</li>
                <li>• Optimal performance</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                generateStaticParams
              </h3>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                <li>• Dinamik rota oluşturma</li>
                <li>• Build time path generation</li>
                <li>• TypeScript desteği</li>
                <li>• Nested routes</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Next.js App Router ile modern SSG implementasyonları
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
