import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async (postData) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const newPost = await response.json();
      setPosts([...posts, newPost]);
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  const handleUpdatePost = async (postId, postData) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const updatedPost = await response.json();
      setPosts(posts.map(post => (post.id === postId ? updatedPost : post)));
      setSelectedPost(null); // Clear selected post after update
    } catch (error) {
      console.error('Error updating post:', error.message);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
  };

  return (
    <div>
      <h1>Posts</h1>
      <PostForm
        post={selectedPost}
        onCreate={handleCreatePost}
        onUpdate={handleUpdatePost}
      />
      <PostList
        posts={posts}
        onDelete={handleDeletePost}
        onEdit={handleEditPost}
      />
      <Link href="/users">
        <button>Users Page</button>
      </Link>
      <Link href="/comments">
        <button>Comments Page</button>
      </Link>
    </div>
  );
};

export default PostsPage;
