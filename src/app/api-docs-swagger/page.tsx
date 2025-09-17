import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export default async function IndexPage() {
  const spec = await getApiDocs()
  console.log('Swagger spec loaded:', spec)
  return (
    <section className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">API Documentation</h1>
      <ReactSwagger spec={spec} />
    </section>
  )
}

function ReactSwagger({ spec }: { spec: object }) {
  return <SwaggerUI spec={spec} />
}

async function getApiDocs() {
  try {
    // Generate edilmiş OpenAPI spec'i kullan
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000'}/openapi.json`,
      { cache: 'no-store' },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch OpenAPI spec')
    }

    const spec = await response.json()
    return spec
  } catch (error) {
    console.error('Error loading OpenAPI spec:', error)
    // Fallback boş spec
    return {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'Error loading API specification',
      },
      paths: {},
    }
  }
}
