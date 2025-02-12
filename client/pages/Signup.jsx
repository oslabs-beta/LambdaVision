import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation and useNavigate for redirection
import axios from 'axios';

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post(
        'http://localhost:3000/api/signup',
        {
          email,
          password,
          username,
        },
        { withCredentials: true }
      );
          console.log("Signup response:", response.data);
      if (response.status === 201) {
        // Call the onSignup function
       
         onSignup();
   
        // Redirect to the Metrics Overview page after successful signup
        navigate('/settings');
      }
  }catch(error) {
    console.error("Signup error:", error.response?.data || error.message);
    setError('Error during signup. Please try again.');
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm'>
        <h1 className='text-2xl font-bold text-center mb-4'>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Email:
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Username:
            </label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Password:
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
         
          <button
            type='submit'
            className='w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
          >
            Sign Up
          </button>
        </form>

        {error && <p className='text-center text-red-500 mt-4'>{error}</p>}

        <p className='text-center text-gray-700 mt-4'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-500'>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
