import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Clock, LogOut, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Pending', path: '/?status=Pending', icon: <Clock size={20} /> },
    { name: 'Completed', path: '/?status=Completed', icon: <CheckSquare size={20} /> },
  ];

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg h-screen sticky top-0">
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary">TaskMaster</h1>
      </div>
      
      <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
        <div className="bg-primary/10 p-2 rounded-full text-primary">
          <User size={20} />
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive && item.path === '/' // simplistic check
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center justify-center w-full space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
