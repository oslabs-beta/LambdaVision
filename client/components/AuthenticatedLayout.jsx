
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom'; 

const AuthenticatedLayout = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar /> 
      <div className='flex flex-col flex-grow'>
        <Header /> 
        <main className='p-6 bg-gray-100 flex-grow overflow-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
