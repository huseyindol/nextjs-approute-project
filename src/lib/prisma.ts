import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

let prisma: PrismaClient
console.log('process.env.NODE_ENV :>> ', process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production') {
  console.log('dev :>> ', 'dev', process.env.NODE_ENV)
  prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
  })
} else {
  console.log('prod :>> ', 'prod', process.env.NODE_ENV)
  prisma = new PrismaClient().$extends(
    withAccelerate(),
  ) as unknown as PrismaClient
}

const globalForPrisma = global as unknown as { prisma: typeof prisma }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
