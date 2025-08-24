import prisma from '@/lib/prisma'

export const getUsers = async () => {
  const users = await prisma.user.findMany()
  return users
}
export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  return user
}
export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  return user
}
