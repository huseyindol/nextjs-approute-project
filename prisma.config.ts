import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
  // Ensure environment variables are available
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})
