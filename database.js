// Import Prisma Client
import { PrismaClient } from '@prisma/client'

// Create an instance of Prisma Client
const prisma = new PrismaClient()

// Example usage: Fetch all users from the database
async function getAllUsers() {
  const users = await prisma.user.findMany()
  return users
}

// Example usage: Create a new user in the database
async function createUser(username, email) {
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
    },
  })
  return newUser
}

// Example usage: Update a user in the database
async function updateUser(id, newData) {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: newData,
  })
  return updatedUser
}

// Example usage: Delete a user from the database
async function deleteUser(id) {
  const deletedUser = await prisma.user.delete({
    where: { id },
  })
  return deletedUser
}

// Close the Prisma Client connection when done
async function cleanup() {
  await prisma.$disconnect()
}

// Example usage of the functions
async function main() {
  try {
    const users = await getAllUsers()
    console.log('All users:', users)

    const newUser = await createUser('testuser', 'test@example.com')
    console.log('New user created:', newUser)

    const updatedUser = await updateUser(newUser.id, { username: 'updateduser' })
    console.log('User updated:', updatedUser)

    const deletedUser = await deleteUser(updatedUser.id)
    console.log('User deleted:', deletedUser)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await cleanup()
  }
}

// Call the main function to execute the example usage
main()
