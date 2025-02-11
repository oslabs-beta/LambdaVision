import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:3000/api/login',
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        // Call the onLogin function
        if (onLogin) {
          onLogin();
        }
        // Redirect to the Metrics Overview page after successful signup
        navigate('/metrics');
      }
    } catch (error) {
      //     setError('Invalid username or password.');
      // }
      if (error.response) {
        // If the server responded with an error status
        if (error.response.status === 401) {
          setError('Invalid username or password.');
        } else if (error.response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(
            error.response.data.error || 'An unexpected error occurred.'
          );
        }
      } else {
        // Network error (server is down or unreachable)
        setError('Cannot connect to the server. Please try again later.');
      }
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm'>
        <h1 className='text-2xl font-bold text-center mb-4'>Login</h1>
        <p className='text-center text-gray-700 mb-6'>
          Enter your credentials to continue
        </p>

        <form onSubmit={handleSubmit}>
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

          <div className='mb-6'>
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
            className='w-full bg-gray-800 text-white p-2 rounded-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400'
          >
            Login
          </button>
        </form>

        {error && (
          <p className='text-center text-red-500 mt-4'>
            Invalid username or password. Please try again.
          </p>
        )}

        <p className='text-center text-gray-700 mt-4'>
          Don’t have an account?{' '}
          <Link to='/signup' className='text-blue-500'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
