import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import {
  ChevronDownIcon,
  Cog8ToothIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import axios from 'axios';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/login');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserInfo();
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className='bg-gray-800 text-white shadow-md'>
      <nav className='flex justify-between items-center px-6 py-4'>
        {/* Left Section */}
        <div className='flex items-center space-x-2'>
          <img src={logo} alt='Logo' className='w-20 h-20 pb-0' />
          <span className='text-lg font-bold'>LambdaVision</span>
        </div>

        {/* Right Section */}
        <div className='relative'>
          {/* <button
            className='bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded'
            onClick={handleSignOut}
          >
            Sign Out
          </button> */}
          <button
            onClick={toggleDropdown}
            className='flex items-center space-x-2 text-lg font-semibold hover:text-blue-400'
          >
            <UserCircleIcon className='size-8 text-white' />
            <ChevronDownIcon className='size-4 text-white' />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200'>
              <div className='p-2'>
                <div className='text-gray-800 font-semibold'>
                  {user.username}
                </div>
                <div className='text-gray-500 text-sm'>{user.email}</div>
              </div>
              <div className='border-t border-gray-200'>
                {/* Settings Link */}
                <div className='p-2'>
                  <Link
                    to='/settings'
                    className='flex items-start space-x-2 w-full text-gray-800 hover:bg-gray-100 py-2 px-4 rounded-lg'
                  >
                    <span className='text-s'>Settings</span>
                    <Cog8ToothIcon className='w-5 h-5 text-gray-600 m-0' />
                  </Link>
                </div>
                {/* Sign Out Button */}
                <div className='border-t border-gray-200'>
                  <button
                    onClick={handleSignOut}
                    className='w-full text-left text-red-600 py-2 px-4 hover:bg-gray-100'
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
