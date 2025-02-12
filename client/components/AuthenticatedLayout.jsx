// /client/components/AuthenticatedLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom'; // This is where child routes will be rendered

const AuthenticatedLayout = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar /> {/* Sidebar is always visible in authenticated routes */}
      <div className='flex flex-col flex-grow'>
        <Header /> {/* Header is always visible in authenticated routes */}
        <main className='p-6 bg-gray-100 flex-grow overflow-auto'>
          <Outlet /> {/* Child routes will be rendered here */}
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
