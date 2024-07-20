import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5500';

export default function () {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Admin');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [templeReps, setTempleReps] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editingTemplerep, setEditingTemplerep] = useState(null);
  const capitalizeTName = (name) => {
    return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };

  useEffect(() => {
    fetchUsers();
    fetchTempleReps();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Error fetching users. Please try again.');
    }
  };

  const fetchTempleReps = async () => {
    try {
      const response = await axios.get(`${API_URL}/templereps`);
      setTempleReps(response.data);
    } catch (error) {
      console.error('Error fetching temple representatives:', error);
      alert('Error fetching temple representatives. Please try again.');
    }
  };

  const handleRemoveUser = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this user?');
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(`${API_URL}/users/${userId}`);
      if (response.data.message === 'User deleted successfully') {
        setUsers(users.filter(user => user._id !== userId));
        alert('User removed successfully');
      } else {
        alert('Failed to remove user: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error removing user:', error);
      alert('Error removing user: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleUpdateUser = async (user) => {
    try {
      const response = await axios.put(`${API_URL}/users/${user._id}`, user);
      if (response.data.message === 'User updated successfully') {
        setUsers(users.map(u => u._id === user._id ? response.data.user : u));
        setEditingUser(null);
        alert('User updated successfully');
      } else {
        alert('Failed to update user: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user: ' + (error.response?.data?.message || error.message));
    }
  };
  
  const handleRemoveTemplerep = async (templerepId) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this temple representative?');
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(`${API_URL}/templereps/${templerepId}`);
      if (response.data.message === 'Temple representative deleted successfully') {
        setTempleReps(templeReps.filter(rep => rep._id !== templerepId));
        alert('Temple representative removed successfully');
      } else {
        alert('Failed to remove temple representative: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error removing temple representative:', error);
      alert('Error removing temple representative: ' + (error.response?.data?.message || error.message));
    }
  };
  
  const handleUpdateTemplerep = async (templerep) => {
    try {
      const updatedTemplerep = {
        ...templerep,
        tname: capitalizeTName(templerep.tname)
      };
      const response = await axios.put(`${API_URL}/templereps/${templerep._id}`, updatedTemplerep);
      if (response.data.message === 'Temple representative updated successfully') {
        setTempleReps(templeReps.map(rep => rep._id === templerep._id ? response.data.templerep : rep));
        setEditingTemplerep(null);
        alert('Temple representative updated successfully');
      } else {
        alert('Failed to update temple representative: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error updating temple representative:', error);
      alert('Error updating temple representative: ' + (error.response?.data?.message || error.message));
    }
  };


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-orange-500 shadow-md p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-10 w-auto mr-3"
              src="/pictures/pngaaa.com-1646422.png"
              alt="Hindu logo"
            />
            <p className="text-xl font-semibold text-white">
              Darshan Ease - User Management
            </p>
          </div>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-white text-orange-500 font-bold py-2 px-4 rounded"
            >
              {userName}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-800 hover:bg-orange-500 hover:text-white w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Mobile</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {editingUser && editingUser._id === user._id ? (
                      <input
                        type="text"
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {editingUser && editingUser._id === user._id ? (
                      <input
                        type="email"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {editingUser && editingUser._id === user._id ? (
                      <input
                        type="text"
                        value={editingUser.mobile}
                        onChange={(e) => setEditingUser({...editingUser, mobile: e.target.value})}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      user.mobile
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {editingUser && editingUser._id === user._id ? (
                      <>
                        <button
  onClick={() => handleUpdateUser(editingUser)}
  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
>
  Save
</button>
                        <button
                          onClick={() => setEditingUser(null)}
                          className="bg-gray-500 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditingUser(user)}
                          className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleRemoveUser(user._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="text-2xl font-bold mb-4">Temple Representatives</h2>
<div className="bg-white shadow-md rounded-lg overflow-hidden">
  <table className="min-w-full">
    <thead>
      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">Temple Name</th>
        <th className="py-3 px-6 text-left">Name</th>
        <th className="py-3 px-6 text-left">Email</th>
        <th className="py-3 px-6 text-left">Mobile</th>
        <th className="py-3 px-6 text-center">Actions</th>
      </tr>
    </thead>
    <tbody className="text-gray-600 text-sm font-light">
      {templeReps.map((rep) => (
        <tr key={rep._id} className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-3 px-6 text-left">
  {editingTemplerep && editingTemplerep._id === rep._id ? (
    <input
      type="text"
      value={editingTemplerep.tname}
      onChange={(e) => setEditingTemplerep({...editingTemplerep, tname: e.target.value})}
      className="border rounded px-2 py-1"
    />
  ) : (
    capitalizeTName(rep.tname)
  )}
</td>
          <td className="py-3 px-6 text-left whitespace-nowrap">
            {editingTemplerep && editingTemplerep._id === rep._id ? (
              <input
                type="text"
                value={editingTemplerep.name}
                onChange={(e) => setEditingTemplerep({...editingTemplerep, name: e.target.value})}
                className="border rounded px-2 py-1"
              />
            ) : (
              rep.name
            )}
          </td>
          <td className="py-3 px-6 text-left">
            {editingTemplerep && editingTemplerep._id === rep._id ? (
              <input
                type="email"
                value={editingTemplerep.email}
                onChange={(e) => setEditingTemplerep({...editingTemplerep, email: e.target.value})}
                className="border rounded px-2 py-1"
              />
            ) : (
              rep.email
            )}
          </td>
          <td className="py-3 px-6 text-left">
            {editingTemplerep && editingTemplerep._id === rep._id ? (
              <input
                type="text"
                value={editingTemplerep.mobile}
                onChange={(e) => setEditingTemplerep({...editingTemplerep, mobile: e.target.value})}
                className="border rounded px-2 py-1"
              />
            ) : (
              rep.mobile
            )}
          </td>
          
          <td className="py-3 px-6 text-center">
            {editingTemplerep && editingTemplerep._id === rep._id ? (
              <>
                <button
                  onClick={() => handleUpdateTemplerep(editingTemplerep)}
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTemplerep(null)}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditingTemplerep(rep)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveTemplerep(rep._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Darshan Ease. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}