import React, { useState, useEffect } from 'react';

const PostForm = ({ onCreate, onUpdate, post }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setContent(post.content || '');
      setAuthorId(post.authorId || '');
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { title, content, authorId };
    if (post) {
      onUpdate(post.id, postData);
    } else {
      onCreate(postData);
    }
    setTitle('');
    setContent('');
    setAuthorId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="number"
        placeholder="Author ID"
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
      />
      <button type="submit">{post ? 'Update' : 'Create'} Post</button>
    </form>
  );
};

export default PostForm;
