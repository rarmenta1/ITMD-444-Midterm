// components/UserForm.js

import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, initialData }) => {
  const [userData, setUserData] = useState(initialData || { username: '', email: '' });

  useEffect(() => {
    setUserData(initialData || { username: '', email: '' });
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={userData.username}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
