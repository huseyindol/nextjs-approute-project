import { PrismaClient } from '@prisma/client'
import { UserType } from '../src/types/userTypes'

const prisma = new PrismaClient()

async function main() {
  await prisma.pageSEO.createMany({
    data: [
      {
        title: 'Ana Sayfa | Hüseyin DOL Portfolio',
        description:
          'Full Stack Developer & UI/UX Designer olarak çalışmalarım ve deneyimlerim',
        keywords: [
          'Hüseyin DOL',
          'Portfolio',
          'Full Stack Developer',
          'Frontend Developer',
          'JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB, MySQL, PostgreSQL, Docker, Kubernetes',
        ],
        canonical: 'https://next.huseyindol.site',
        noIndex: false,
        noFollow: false,
      },
      {
        title: 'Hakkımda | Hüseyin DOL Portfolio',
        description:
          'Hakkımda sayfasına hoş geldiniz. Ben Hüseyin DOL, bir frontend developer ve UI/UX tasarımcısıyım.',
        keywords: [
          'Hüseyin DOL',
          'Hakkımda',
          'Full Stack Developer',
          'Frontend Developer',
          'JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB, MySQL, PostgreSQL, Docker, Kubernetes',
        ],
        canonical: 'https://next.huseyindol.site',
        noIndex: false,
        noFollow: false,
      },
    ],
  })
  await prisma.page.createMany({
    data: [
      {
        name: 'Ana Sayfa',
        pageSEOId: 1,
      },
      {
        name: 'Hakkımda',
        pageSEOId: 2,
      },
    ],
  })
  // Create 4 users
  await prisma.user.createMany({
    data: [
      {
        email: 'test@test.com',
        password: '123456',
        firstName: 'Test First Name',
        lastName: 'Test Last Name',
      },
      {
        email: 'huseyindol@gmail.com',
        password: '123456',
        firstName: 'Hüseyin',
        lastName: 'DOL',
      },
      {
        email: 'dolyagizefe@gmail.com',
        password: '123456',
        firstName: 'Yagiz Efe',
        lastName: 'DOL',
      },
      {
        email: 'salim@gmail.com',
        password: '123456',
        firstName: 'Salim',
        lastName: 'Koç',
      },
    ],
  })
  // Find all users to get their IDs
  const userRecords: UserType[] = await prisma.user.findMany()

  const userIdMapping = {
    test: userRecords.find(user => user.email === 'test@test.com')?.id,
    huseyindol: userRecords.find(user => user.email === 'huseyindol@gmail.com')
      ?.id,
    yagizefedol: userRecords.find(
      user => user.email === 'dolyagizefe@gmail.com',
    )?.id,
    salim: userRecords.find(user => user.email === 'salim@gmail.com')?.id,
  }

  // Create posts distributed among users
  await prisma.post.createMany({
    data: [
      // Test's posts
      {
        title: 'Getting Started with TypeScript and Prisma',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id erat a lorem tincidunt ultricies. Vivamus porta bibendum nulla vel accumsan.',
        published: true,
      },
      {
        title: 'How ORMs Simplify Complex Queries',
        content:
          'Duis sagittis urna ut sapien tristique convallis. Aenean vel ligula felis. Phasellus bibendum sem at elit dictum volutpat.',
        published: false,
      },

      // Hüseyin's posts
      {
        title: 'Mastering Prisma: Efficient Database Migrations',
        content:
          'Ut ullamcorper nec erat id auctor. Nullam nec ligula in ex feugiat tincidunt. Cras accumsan vehicula tortor ut eleifend.',
        published: true,
      },
      {
        title: 'Best Practices for Type Safety in ORMs',
        content:
          'Aliquam erat volutpat. Suspendisse potenti. Maecenas fringilla elit vel eros laoreet, et tempor sapien vulputate.',
        published: true,
      },
      {
        title: 'TypeScript Utility Types for Database Models',
        content:
          'Donec ac magna facilisis, vestibulum ligula at, elementum nisl. Morbi volutpat eget velit eu egestas.',
        published: false,
      },

      // Yagiz Efe's posts
      {
        title: 'Why TypeORM Still Has Its Place in 2025',
        content:
          'Morbi non arcu nec velit cursus feugiat sit amet sit amet mi. Etiam porttitor ligula id sem molestie, in tempor arcu bibendum.',
        published: true,
      },
      {
        title: 'NoSQL vs SQL: The Definitive Guide for Developers',
        content:
          'Suspendisse a ligula sit amet risus ullamcorper tincidunt. Curabitur tincidunt, sapien id fringilla auctor, risus libero gravida odio, nec volutpat libero orci nec lorem.',
        published: true,
      },
      {
        title: 'Optimizing Queries with Prisma’s Select and Include',
        content:
          'Proin vel diam vel nisi facilisis malesuada. Sed vitae diam nec magna mollis commodo a vitae nunc.',
        published: false,
      },
      {
        title: 'PostgreSQL Optimizations Every Developer Should Know',
        content:
          'Nullam mollis quam sit amet lacus interdum, at suscipit libero pellentesque. Suspendisse in mi vitae magna finibus pretium.',
        published: true,
      },
      {
        title: 'Scaling Applications with Partitioned Tables in PostgreSQL',
        content:
          'Cras vitae tortor in mauris tristique elementum non id ipsum. Nunc vitae pulvinar purus.',
        published: true,
      },
    ],
  })

  // Create images
  await prisma.images.createMany({
    data: [
      {
        url: '/assets/img/code1.jpeg',
        postId: 1,
      },
      {
        url: '/assets/img/code2.jpeg',
        postId: 2,
      },
      {
        url: '/assets/img/code1.jpeg',
        postId: 3,
      },
      {
        url: '/assets/img/code2.jpeg',
        postId: 4,
      },
      {
        url: '/assets/img/code3.jpeg',
        postId: 5,
      },
      {
        url: '/assets/img/code4.jpeg',
        postId: 6,
      },
      {
        url: '/assets/img/code1.jpeg',
        postId: 7,
      },
      {
        url: '/assets/img/code2.jpeg',
        postId: 8,
      },
      {
        url: '/assets/img/code3.jpeg',
        postId: 9,
      },
      {
        url: '/assets/img/code4.jpeg',
        postId: 10,
      },
    ],
  })

  await prisma.postAuthor.createMany({
    data: [
      {
        postId: 1,
        authorId: userIdMapping.test!,
      },
      {
        postId: 2,
        authorId: userIdMapping.test!,
      },
      {
        postId: 3,
        authorId: userIdMapping.huseyindol!,
      },
      {
        postId: 4,
        authorId: userIdMapping.huseyindol!,
      },
      {
        postId: 5,
        authorId: userIdMapping.huseyindol!,
      },
      {
        postId: 6,
        authorId: userIdMapping.yagizefedol!,
      },
      {
        postId: 7,
        authorId: userIdMapping.yagizefedol!,
      },
      {
        postId: 8,
        authorId: userIdMapping.yagizefedol!,
      },
      {
        postId: 9,
        authorId: userIdMapping.yagizefedol!,
      },
      {
        postId: 10,
        authorId: userIdMapping.yagizefedol!,
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
