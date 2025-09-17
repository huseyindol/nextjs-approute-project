import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

let prisma: PrismaClient

console.log('process.env.NODE_ENV :>> ', process.env.NODE_ENV)
console.log(
  'DATABASE_URL :>> ',
  process.env.DATABASE_URL?.substring(0, 20) + '...',
)

// Check if DATABASE_URL is for Accelerate or local
const isAccelerateUrl =
  process.env.DATABASE_URL?.startsWith('prisma://') ||
  process.env.DATABASE_URL?.startsWith('prisma+postgres://')

if (process.env.NODE_ENV !== 'production') {
  console.log('dev :>> ', 'dev', process.env.NODE_ENV)
  if (isAccelerateUrl) {
    // Use Accelerate in development if URL supports it
    prisma = new PrismaClient({
      log: ['query', 'error', 'warn'],
    }).$extends(withAccelerate()) as unknown as PrismaClient
  } else {
    // Use regular PrismaClient for local development
    prisma = new PrismaClient({
      log: ['query', 'error', 'warn'],
    })
  }
} else {
  console.log('prod :>> ', 'prod', process.env.NODE_ENV)
  if (isAccelerateUrl) {
    prisma = new PrismaClient().$extends(
      withAccelerate(),
    ) as unknown as PrismaClient
  } else {
    prisma = new PrismaClient()
  }
}

const globalForPrisma = global as unknown as { prisma: typeof prisma }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
