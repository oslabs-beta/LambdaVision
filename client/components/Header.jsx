import React from "react";

function Header() {
  return (
    <div className="bg-gray-800 text-white shadow-md">
      <nav className="flex justify-between items-center px-6 py-4">
        {/* Left Section */}
        <div className="text-lg font-bold">
          LambdaVision
        </div>

        {/* Right Section */}
        <div className="relative">
          <button
            className="relative focus:outline-none"
            aria-label="Notifications"
          >
            <i className="fas fa-bell text-xl"></i> {/* Font Awesome icon */}
            {/* Notification Badge */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
              3
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
