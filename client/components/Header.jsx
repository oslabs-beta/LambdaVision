import React from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'

function Header() {
   const navigate = useNavigate();

    const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    // Redirect to the login page
    navigate('/');
    };

  return (
    <div className="bg-gray-800 text-white shadow-md">
      <nav className="flex justify-between items-center px-6 py-4">
       {/* Left Section */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-20 h-20 pb-0" />
        <span className="text-lg font-bold">LambdaVision</span>
      </div>

        {/* Right Section */}
        <div className="relative">
      

            <button
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
            onClick={handleSignOut}
          >
            Sign Out
          
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
