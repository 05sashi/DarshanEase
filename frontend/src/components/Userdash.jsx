import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Userdash() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Sashi'); // Set to 'Sashi' as requested
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    navigate('/user-login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-orange-500 shadow-md p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-10 w-auto mr-3"
              src="/pictures/pngaaa.com-1646422.png"
              alt="Hindu logo"
            />
            <p className="text-xl font-semibold text-white">Darshan Ease</p>
          </div>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-white hover:bg-orange-700 text-black font-bold py-2 px-4 rounded flex items-center"
            >
              <span>{userName}</span>
              <i className="bi bi-arrow-down ml-1"></i>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Add your main content here */}
      </main>

      <footer className="bg-gray-200 p-4">
        <div className="container mx-auto text-center text-gray-600">
          © 2024 DarshanEase, Inc
        </div>
      </footer>
    </div>
  );
}