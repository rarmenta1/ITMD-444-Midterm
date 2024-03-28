// pages/users.js

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch user data from the backend API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleFormSubmit = async (userData) => {
    try {
      let response;
      if (selectedUser) {
        // If selectedUser exists, it means we're updating an existing user
        response = await fetch(`/api/users/${selectedUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
      } else {
        // If selectedUser is null, it means we're creating a new user
        response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
      }
      if (!response.ok) {
        throw new Error(selectedUser ? 'Failed to update user' : 'Failed to create user');
      }
      const newUser = await response.json();
      console.log(selectedUser ? 'User updated successfully:' : 'User created successfully:', newUser);
      // Reset selectedUser after successful create/update
      setSelectedUser(null);
    } catch (error) {
      console.error('Error creating/updating user:', error.message);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <UserForm onSubmit={handleFormSubmit} initialData={selectedUser} />
      <UserList users={users} onEdit={handleEdit} />
      <Link href="/posts">
        <button>Posts Page</button>
      </Link>
      <Link href="/comments">
        <button>Comments Page</button>
      </Link>
    </div>
  );
};

export default UsersPage;
