// CommentsPage.js

import React, { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const prisma = new PrismaClient();

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [editedComment, setEditedComment] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('/api/comments');
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };
    fetchComments();
  }, []);

  const handleCreateComment = async (commentData) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
      if (!response.ok) {
        throw new Error('Failed to create comment');
      }
      const newComment = await response.json();
      setComments([...comments, newComment]);
    } catch (error) {
      console.error('Error creating comment:', error.message);
    }
  };

  const handleUpdateComment = async (commentId, commentData) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
      if (!response.ok) {
        throw new Error('Failed to update comment');
      }
      const updatedComment = await response.json();
      setComments(comments.map(comment => (comment.id === commentId ? updatedComment : comment)));
      setEditedComment(null); // Reset edited comment after update
    } catch (error) {
      console.error('Error updating comment:', error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  };

  const handleEditComment = (comment) => {
    setEditedComment(comment);
  };

  return (
    <div>
      <h1>Comments</h1>
      <CommentForm
        onCreate={handleCreateComment}
        onUpdate={handleUpdateComment}
        comment={editedComment} // Pass editedComment here
      />
      <CommentList
        comments={comments}
        onDelete={handleDeleteComment}
        onEdit={handleEditComment}
      />
    </div>
  );
};

export default CommentsPage;
