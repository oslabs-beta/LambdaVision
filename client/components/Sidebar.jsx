import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className='bg-gray-800 text-white h-screen w-64 p-6'>
      <ul className='space-y-4'>
        <li className='text-lg font-semibold hover:text-blue-400 cursor-pointer'>
          <Link to='/'> Overview</Link>
        </li>

        <li className='text-lg font-semibold hover:text-blue-400 cursor-pointer'>
          <Link to='/function-detail'> Functions</Link>
        </li>

        <li className='text-lg font-semibold hover:text-blue-400 cursor-pointer'>
          <Link to='/errors'>Active Errors</Link>
        </li>
        <li className='text-lg font-semibold hover:text-blue-400 cursor-pointer'>
          <Link to='/settings'>Settings</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
