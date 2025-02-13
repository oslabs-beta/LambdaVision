import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/lambda-logo.png';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

        localStorage.setItem("token", response.data.token);  
        onLogin(); 
        navigate('/metrics');
      }
    } catch (error) {
      setError('Invalid username or password.');
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm'>
        <div className='flex items-center justify-center space-x-2'>
          <img src={logo} alt='Logo' className='w-36 h-36 pb-0 mx-auto' />
        </div>
        <h1 className='text-2xl font-semibold text-center text-gray-900 mb-2'>
          Login
        </h1>
        <p className='text-sm text-center text-gray-600 mb-6'>
          Enter your username and password to continue
        </p>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <input
              type='text'
              value={username}
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>

          <div className='mb-6'>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='mt-1 block w-full p-3 border border-gray-300 rounded-md pr-10' // Added padding-right for the icon
                required
              />
              <button
                type='button'
                onClick={handlePasswordToggle}
                className='absolute right-3 top-1/2 transform -translate-y-1/2'
              >
                {showPassword ? (
                  <EyeSlashIcon className='w-5 h-5 text-gray-600' />
                ) : (
                  <EyeIcon className='w-5 h-5 text-gray-600' />
                )}
              </button>
            </div>
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
