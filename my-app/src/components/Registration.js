import React, { useState } from 'react';

const Registration = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration Data:', formData);
  };

  return (
    <div>
      <h2>Registration Page</h2>
      <form onSubmit={handleSubmit}>
        <label>Username: <input type="text" name="username" onChange={handleChange} /></label><br />
        <label>Email: <input type="email" name="email" onChange={handleChange} /></label><br />
        <label>Password: <input type="password" name="password" onChange={handleChange} /></label><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
