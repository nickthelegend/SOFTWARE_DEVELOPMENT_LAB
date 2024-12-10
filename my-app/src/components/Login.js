import React, { useState } from 'react';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', loginData);
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <label>Email: <input type="email" name="email" onChange={handleChange} /></label><br />
        <label>Password: <input type="password" name="password" onChange={handleChange} /></label><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
