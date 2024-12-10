import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Student Management System</h1>
      <nav>
        <Link to="/registration">Registration</Link> | 
        <Link to="/login">Login</Link> | 
        <Link to="/contact">Contact</Link> | 
        <Link to="/about">About</Link>
      </nav>
    </div>
  );
};

export default Home;
