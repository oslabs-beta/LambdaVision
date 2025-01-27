import React from "react";

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white h-screen w-64 p-6">
      <ul className="space-y-4">
        <li className="text-lg font-semibold hover:text-blue-400 cursor-pointer">
          Active Errors
        </li>
        <li className="text-lg font-semibold hover:text-blue-400 cursor-pointer">
        Resolved
        </li>
        <li className="text-lg font-semibold hover:text-blue-400 cursor-pointer">
          Alert History
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;