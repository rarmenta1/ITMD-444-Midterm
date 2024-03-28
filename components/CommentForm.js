// CommentForm.js

import React, { useState, useEffect } from 'react';

const CommentForm = ({ onCreate, onUpdate, comment }) => {
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [postId, setPostId] = useState('');

  useEffect(() => {
    if (comment) {
      setContent(comment.content || '');
      setUserId(comment.User ? comment.User.id.toString() : '');
      setPostId(comment.Post ? comment.Post.id.toString() : '');
    }
  }, [comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentData = { content, userId, postId };
    if (comment) {
      onUpdate(comment.id, commentData);
    } else {
      onCreate(commentData);
    }
    // Reset form fields after submit
    setContent('');
    setUserId('');
    setPostId('');
  };

  console.log("Edit comment:", comment);
  console.log("Form values:", content, userId, postId);

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Post ID"
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
      />
      <button type="submit">{comment ? 'Update' : 'Create'} Comment</button>
    </form>
  );
};

export default CommentForm;
