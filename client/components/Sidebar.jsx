import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChartBarIcon,
  CodeBracketIcon,
  ExclamationTriangleIcon,

} from '@heroicons/react/24/solid';

const Sidebar = () => {
  return (
    <aside className='bg-gray-800 text-white h-screen w-64 p-6'>
      <ul className='space-y-4 flex-1'>
        <li>
          <Link
            to='/metrics'
            className='flex items-center space-x-3 text-lg font-semibold hover:text-blue-400'
          >
            <ChartBarIcon className='w-6 h-6 text-white' />
            <span>Overview</span>
          </Link>
        </li>

        <li>
          <Link
            to='/function-detail'
            className='flex items-center space-x-3 text-lg font-semibold hover:text-blue-400'
          >
            <CodeBracketIcon className='w-6 h-6 text-white' />
            <span>Functions</span>
          </Link>
        </li>

        <li>
          <Link
            to='/errors'
            className='flex items-center space-x-3 text-lg font-semibold hover:text-blue-400'
          >
            <ExclamationTriangleIcon className='w-6 h-6 text-white' />
            <span>Active Errors</span>
          </Link>
        </li>

     
      </ul>
    </aside>
  );
};

export default Sidebar;
