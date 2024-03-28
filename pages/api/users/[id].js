// pages/api/users/[id].js

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const userId = req.query.id;

  if (req.method === 'GET') {
    // Handle GET request to retrieve user details
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(userId) }
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  } else if (req.method === 'PUT') {
    // Handle PUT request to update user details
    const { username, email } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          username,
          email,
        },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update user' });
    }
  } else if (req.method === 'DELETE') {
    // Handle DELETE request to delete user
    try {
      await prisma.user.delete({
        where: { id: Number(userId) },
      });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete user' });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
