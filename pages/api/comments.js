import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get all comments
    const comments = await prisma.comment.findMany()
    res.status(200).json(comments)
  } else if (req.method === 'POST') {
    // Create a new comment
    const { content, userId, postId } = req.body
    if (!userId) {
      res.status(400).json({ error: 'User id is missing in the request body' })
      return
    }
    try {
      const newComment = await prisma.comment.create({
        data: {
          content,
          User: { connect: { id: Number(userId) } }, // Connects the comment to the user
          Post: { connect: { id: Number(postId) } }, // Connects the comment to the post
        },
      })
      res.status(201).json(newComment)
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Failed to create comment' })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
