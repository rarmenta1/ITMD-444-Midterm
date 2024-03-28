import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const {
    query: { id },
    method,
    body
  } = req

  if (method === 'GET') {
    // Get all users
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } else if (method === 'POST') {
    // Create a new user
    const { username, email } = body
    try {
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
        },
      })
      res.status(201).json(newUser)
    } catch (error) {
      res.status(400).json({ error: 'Failed to create user' })
    }
  } else if (method === 'PUT') {
    // Update an existing user
    const { username, email } = body
    try {
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) }, // Extract id from the request parameters
        data: {
          username,
          email,
        },
      })
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(400).json({ error: 'Failed to update user' })
    }
  } else if (method === 'DELETE') {
    // Delete an existing user
    try {
      await prisma.user.delete({
        where: { id: Number(id) },
      })
      res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete user' })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
