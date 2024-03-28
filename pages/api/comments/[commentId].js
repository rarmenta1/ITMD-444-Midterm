// pages/api/comments/[commentId].js

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const {
    query: { commentId },
    method,
    body
  } = req

  if (method === 'DELETE') {
    // Delete an existing comment
    try {
      await prisma.comment.delete({
        where: { id: Number(commentId) },
      })
      res.status(200).json({ message: 'Comment deleted successfully' })
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: 'Failed to delete comment' })
    }
  } else if (method === 'PUT') {
    // Update an existing comment
    const { content, postId, userId } = body
    try {
      const updatedComment = await prisma.comment.update({
        where: { id: Number(commentId) },
        data: {
          content,
          Post: { connect: { id: Number(postId) } }, // Connects the comment to the post
          User: { connect: { id: Number(userId) } }, // Connects the comment to the user
        },
      })
      res.status(200).json(updatedComment)
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: 'Failed to update comment' })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
