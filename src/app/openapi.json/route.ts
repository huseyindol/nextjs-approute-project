import { readFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

/**
 * @swagger
 * /openapi.json:
 *   get:
 *     tags:
 *       - Documentation
 *     summary: Get auto-generated OpenAPI specification
 *     description: Returns the auto-generated OpenAPI specification in JSON format from Next OpenAPI Gen
 *     responses:
 *       200:
 *         description: OpenAPI specification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      'public',
      'openapi-generated.json',
    )
    const fileContents = await readFile(filePath, 'utf8')
    const spec = JSON.parse(fileContents)

    return NextResponse.json(spec)
  } catch (error) {
    console.error('Error loading OpenAPI spec:', error)
    return NextResponse.json(
      { error: 'OpenAPI specification not found' },
      { status: 404 },
    )
  }
}
