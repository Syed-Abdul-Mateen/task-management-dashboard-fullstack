import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Clock, LogOut, User, Activity } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);

  const navItems = [
    { name: 'Overview', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Active Tasks', path: '/?status=Pending', icon: <Activity size={20} /> },
    { name: 'Completed', path: '/?status=Completed', icon: <CheckSquare size={20} /> },
  ];

  return (
    <div className="flex flex-col w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 h-screen sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
      <div className="flex items-center px-8 h-24">
        <div className="bg-gradient-primary-glow p-2 rounded-xl shadow-lg shadow-primary/20 mr-3">
          <CheckSquare size={24} className="text-white" />
        </div>
        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
          TaskMaster
        </h1>
      </div>
      
      <div className="px-6 py-4 mb-4 mx-4 bg-gray-50/80 rounded-2xl border border-gray-100 flex items-center space-x-4">
        <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
          <User size={20} />
        </div>
        <div className="overflow-hidden">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Welcome</p>
          <p className="text-sm font-bold text-gray-900 truncate">{user?.email?.split('@')[0]}</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-2">
        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 mt-4">Menu</p>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium ${
                isActive && item.path === '/' // basic check, normally would use a router hook for query params
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-gray-500 hover:bg-gray-100/80 hover:text-gray-900'
              }`
            }
          >
            <div className={`transition-transform duration-300 group-hover:scale-110`}>
              {item.icon}
            </div>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <button
          onClick={logout}
          className="group flex items-center justify-center w-full space-x-2 px-4 py-3.5 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-xl transition-all duration-300 border border-gray-200/50 hover:border-red-200 font-medium"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Logout securely</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
