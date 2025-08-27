'use client'

import { ApiReferenceReact } from '@scalar/api-reference-react'

export default function AutoApiDocs() {
  return (
    <div className="min-h-screen bg-white py-24 pt-16">
      <ApiReferenceReact
        configuration={{
          url: '/openapi.json',
          theme: 'default',
          layout: 'modern',
          hideDownloadButton: false,
          showSidebar: true,
          hideModels: false,
          darkMode: false,
          customCss: `
            .api-reference {
              --scalar-color-1: #2563eb;
              --scalar-color-2: #1d4ed8;
              --scalar-color-3: #1e40af;
            }
            .api-reference .models {
              display: block;
            }
          `,
        }}
      />
    </div>
  )
}
