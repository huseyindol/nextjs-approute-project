import prisma from '@/lib/prisma'

export default async function PrismaPage() {
  const users = await prisma.user.findMany()
  return (
    <section
      id="about"
      className="py-12 flex items-center justify-center pt-24 flex-col gap-4"
    >
      <h1>Prisma Page</h1>
      <div className="flex flex-col gap-4">
        {users.map(user => (
          <div key={user.id}>{user.email}</div>
        ))}
      </div>
    </section>
  )
}
