import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTab } from '../contexts/TabContext';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { currentTab } = useTab();
  const navigate = useNavigate();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-yellow-500">
                MovieEaze
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/search" 
                className={`text-gray-300 hover:text-yellow-500 transition ${
                  currentTab === 'search' ? 'text-yellow-500 font-medium' : ''
                }`}
              >
                Search
              </Link>
              <Link 
                to="/favorites" 
                className={`text-gray-300 hover:text-yellow-500 transition ${
                  currentTab === 'favorites' ? 'text-yellow-500 font-medium' : ''
                }`}
              >
                Favorites
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              {user && (
                <span className="text-gray-300">
                  Hello, <span className="font-medium">{user.name}</span>
                </span>
              )}
              <button
                onClick={handleLogout}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Logout
              </button>
            </div>
            
            <button 
              className="md:hidden text-gray-300 focus:outline-none" 
              onClick={toggleSideMenu}
              aria-label="Toggle mobile menu"
            >
              {isSideMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSideMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-4 py-5 bg-gray-800">
          <h2 className="text-lg font-bold text-yellow-500">Menu</h2>
          <button 
            onClick={closeSideMenu}
            className="text-gray-300 focus:outline-none"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        {user && (
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="text-gray-300">
              Hello, <span className="font-medium text-white">{user.name}</span>
            </p>
          </div>
        )}
        
        <div className="flex flex-col py-4">
          <Link 
            to="/search" 
            className={`px-4 py-3 text-gray-300 hover:bg-gray-800 ${
              currentTab === 'search' ? 'bg-gray-800 text-yellow-500 font-medium' : ''
            }`}
            onClick={closeSideMenu}
          >
            Search
          </Link>
          <Link 
            to="/favorites" 
            className={`px-4 py-3 text-gray-300 hover:bg-gray-800 ${
              currentTab === 'favorites' ? 'bg-gray-800 text-yellow-500 font-medium' : ''
            }`}
            onClick={closeSideMenu}
          >
            Favorites
          </Link>
          
          <div className="mt-auto px-4 pt-6 pb-4">
            <button
              onClick={() => {
                handleLogout();
                closeSideMenu();
              }}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {isSideMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSideMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;