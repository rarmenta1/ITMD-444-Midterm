// pages/api/posts.js

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get all posts
    const posts = await prisma.post.findMany()
    res.status(200).json(posts)
  } else if (req.method === 'POST') {
    // Create a new post
    const { title, content, authorId } = req.body
    try {
      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          // Ensure authorId is converted to number
          User: { connect: { id: Number(authorId) } }, // Connects the post to the user
        },
      })
      res.status(201).json(newPost)
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: 'Failed to create post' })
    }
  } else if (req.method === 'PUT') {
    // Update an existing post
    const { id, title, content } = req.body
    try {
      const updatedPost = await prisma.post.update({
        where: { id: Number(id) },
        data: {
          title,
          content,
        },
      })
      res.status(200).json(updatedPost)
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: 'Failed to update post' })
    }
  } else if (req.method === 'DELETE') {
    // Delete an existing post
    const { id } = req.body
    try {
      await prisma.post.delete({
        where: { id: Number(id) },
      })
      res.status(200).json({ message: 'Post deleted successfully' })
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: 'Failed to delete post' })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
