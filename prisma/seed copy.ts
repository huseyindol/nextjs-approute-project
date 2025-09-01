import { UserType } from '@/types/userTypes'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create 5 users
  await prisma.user.createMany({
    data: [
      {
        email: 'test@test.com',
        password: '123456',
        firstName: 'Test First Name',
        lastName: 'Test Last Name',
      },
      {
        email: 'alice@example.com',
        password: '123456',
        firstName: 'Alice',
        lastName: 'Smith',
      },
      {
        email: 'charlie@example.com',
        password: '123456',
        firstName: 'Charlie',
        lastName: 'Brown',
      },
      {
        email: 'diana@example.com',
        password: '123456',
        firstName: 'Diana',
        lastName: 'Johnson',
      },
      {
        email: 'edward@example.com',
        password: '123456',
        firstName: 'Edward',
        lastName: 'Davis',
      },
    ],
  })

  // Find all users to get their IDs
  const userRecords: UserType[] = await prisma.user.findMany()

  const userIdMapping = {
    alice: userRecords.find(user => user.email === 'alice@example.com')?.id,
    charlie: userRecords.find(user => user.email === 'charlie@example.com')?.id,
    diana: userRecords.find(user => user.email === 'diana@example.com')?.id,
    edward: userRecords.find(user => user.email === 'edward@example.com')?.id,
    test: userRecords.find(user => user.email === 'test@test.com')?.id,
  }

  await prisma.module.createMany({
    data: [
      {
        name: 'Module 1',
      },
      {
        name: 'Module 2',
      },
      {
        name: 'Module 3',
      },
    ],
  })

  // Create posts distributed among users
  await prisma.post.createMany({
    data: [
      // Alice's posts
      {
        title: 'Getting Started with TypeScript and Prisma',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id erat a lorem tincidunt ultricies. Vivamus porta bibendum nulla vel accumsan.',
        published: true,
        userId: userIdMapping.alice!,
      },
      {
        title: 'How ORMs Simplify Complex Queries',
        content:
          'Duis sagittis urna ut sapien tristique convallis. Aenean vel ligula felis. Phasellus bibendum sem at elit dictum volutpat.',
        published: false,
        userId: userIdMapping.alice!,
      },

      // Test's posts
      {
        title: 'Mastering Prisma: Efficient Database Migrations',
        content:
          'Ut ullamcorper nec erat id auctor. Nullam nec ligula in ex feugiat tincidunt. Cras accumsan vehicula tortor ut eleifend.',
        published: true,
        userId: userIdMapping.test!,
        moduleId: 1,
      },
      {
        title: 'Best Practices for Type Safety in ORMs',
        content:
          'Aliquam erat volutpat. Suspendisse potenti. Maecenas fringilla elit vel eros laoreet, et tempor sapien vulputate.',
        published: true,
        userId: userIdMapping.test!,
        moduleId: 1,
      },
      {
        title: 'TypeScript Utility Types for Database Models',
        content:
          'Donec ac magna facilisis, vestibulum ligula at, elementum nisl. Morbi volutpat eget velit eu egestas.',
        published: false,
        userId: userIdMapping.test!,
        moduleId: 2,
      },

      // Charlie's posts (no posts for Charlie)

      // Diana's posts
      {
        title: 'Exploring Database Indexes and Their Performance Impact',
        content:
          'Vivamus ac velit tincidunt, sollicitudin erat quis, fringilla enim. Aenean posuere est a risus placerat suscipit.',
        published: true,
        userId: userIdMapping.diana!,
        moduleId: 2,
      },
      {
        title: 'Choosing the Right Database for Your TypeScript Project',
        content:
          'Sed vel suscipit lorem. Duis et arcu consequat, sagittis justo quis, pellentesque risus. Curabitur sed consequat est.',
        published: false,
        userId: userIdMapping.diana!,
      },
      {
        title: 'Designing Scalable Schemas with Prisma',
        content:
          'Phasellus ut erat nec elit ultricies egestas. Vestibulum rhoncus urna eget magna varius pharetra.',
        published: true,
        userId: userIdMapping.diana!,
        moduleId: 2,
      },
      {
        title: 'Handling Relations Between Models in ORMs',
        content:
          'Integer luctus ac augue at tristique. Curabitur varius nisl vitae mi fringilla, vel tincidunt nunc dictum.',
        published: false,
        userId: userIdMapping.diana!,
      },

      // Edward's posts
      {
        title: 'Why TypeORM Still Has Its Place in 2025',
        content:
          'Morbi non arcu nec velit cursus feugiat sit amet sit amet mi. Etiam porttitor ligula id sem molestie, in tempor arcu bibendum.',
        published: true,
        userId: userIdMapping.edward!,
      },
      {
        title: 'NoSQL vs SQL: The Definitive Guide for Developers',
        content:
          'Suspendisse a ligula sit amet risus ullamcorper tincidunt. Curabitur tincidunt, sapien id fringilla auctor, risus libero gravida odio, nec volutpat libero orci nec lorem.',
        published: true,
        userId: userIdMapping.edward!,
      },
      {
        title: 'Optimizing Queries with Prisma’s Select and Include',
        content:
          'Proin vel diam vel nisi facilisis malesuada. Sed vitae diam nec magna mollis commodo a vitae nunc.',
        published: false,
        userId: userIdMapping.edward!,
      },
      {
        title: 'PostgreSQL Optimizations Every Developer Should Know',
        content:
          'Nullam mollis quam sit amet lacus interdum, at suscipit libero pellentesque. Suspendisse in mi vitae magna finibus pretium.',
        published: true,
        userId: userIdMapping.edward!,
      },
      {
        title: 'Scaling Applications with Partitioned Tables in PostgreSQL',
        content:
          'Cras vitae tortor in mauris tristique elementum non id ipsum. Nunc vitae pulvinar purus.',
        published: true,
        userId: userIdMapping.edward!,
      },
    ],
  })

  console.log('Seeding completed.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
