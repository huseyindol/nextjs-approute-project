#!/usr/bin/env node

import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
dotenv.config()

const templatePath = path.join(__dirname, '..', 'next.openapi.template.json')
const outputPath = path.join(__dirname, '..', 'next.openapi.json')

try {
  // Read template file
  const template = fs.readFileSync(templatePath, 'utf8')

  // Get environment variables with fallbacks
  const NODE_ENV = process.env.NODE_ENV || 'development'
  const NEXT_PUBLIC_HOST =
    NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_HOST || 'https://www.huseyindol.site'
  const SERVER_DESCRIPTION =
    NODE_ENV === 'development' ? 'Development' : 'Production'

  // Replace template variables
  const result = template
    .replace(/{{NEXT_PUBLIC_HOST}}/g, NEXT_PUBLIC_HOST)
    .replace(/{{NODE_ENV}}/g, SERVER_DESCRIPTION)

  // Write the processed config
  fs.writeFileSync(outputPath, result, 'utf8')

  console.log(`✅ OpenAPI config generated successfully!`)
  console.log(`   Server URL: ${NEXT_PUBLIC_HOST}/api`)
  console.log(`   Environment: ${SERVER_DESCRIPTION}`)
} catch (error) {
  console.error('❌ Error generating OpenAPI config:', error.message)
  process.exit(1)
}
