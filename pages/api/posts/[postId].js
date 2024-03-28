// pages/api/posts/[postId].js

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const {
    query: { postId },
    method,
    body
  } = req

  if (method === 'DELETE') {
    // Delete an existing post
    try {
      await prisma.post.delete({
        where: { id: Number(postId) },
      })
      res.status(200).json({ message: 'Post deleted successfully' })
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: 'Failed to delete post' })
    }
  } else if (method === 'PUT') {
    // Update an existing post
    const { title, content, authorId } = body
    try {
      const updatedPost = await prisma.post.update({
        where: { id: Number(postId) },
        data: {
          title,
          content,
          // Correctly specifying the author relation
          User: { connect: { id: Number(authorId) } } 
        },
      })
      res.status(200).json(updatedPost)
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: 'Failed to update post' })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
