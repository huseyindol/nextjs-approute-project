import prisma from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function PrismaPage() {
  let users: Array<{ id: number; email: string }> = []
  let error: string | null = null

  try {
    users = await prisma.user.findMany()
  } catch (err: unknown) {
    error = err instanceof Error ? err.message : 'An unknown error occurred'
    console.error('Database error:', err)
  }

  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center gap-4 py-12 pt-24"
    >
      <h1>Prisma Page</h1>
      {error ? (
        <div className="rounded border border-red-300 p-4 text-red-500">
          <h2 className="font-bold">Database Error:</h2>
          <p>{error}</p>
          <p className="mt-2 text-sm">
            Run:{' '}
            <code className="rounded bg-gray-100 px-1">bun run db:push</code> to
            setup the database
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {users.length === 0 ? (
            <p>
              No users found. Run{' '}
              <code className="rounded bg-gray-100 px-1">
                bun run prisma:seed
              </code>{' '}
              to add sample data.
            </p>
          ) : (
            users.map(user => (
              <div key={user.id} className="rounded border p-2">
                {user.email}
              </div>
            ))
          )}
        </div>
      )}
    </section>
  )
}
