import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import '../Sapp.css';
import {useNavigate} from 'react-router-dom'

const API_URL = 'http://localhost:5500';

export default function Dash() {
  const navigate=useNavigate();

  const [userName, setUserName] = useState('Sashi'); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [activeSection, setActiveSection] = useState('Dashboard');
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  
  const fetchTempleRep = async () => {
    try {
      const response = await axios.get(`${API_URL}/templereps`);
      const loggedInEmail = localStorage.getItem('templeRepEmail');
      const rep = response.data.find(rep => rep.email === loggedInEmail);
      if (rep) {
        setTempleRep(rep);
      }
    } catch (error) {
      console.error('Error fetching temple representative:', error);
    }
  };
  
  
  const handleNavigation = (section) => {
    setActiveSection(section);
  };
  
  useEffect(() => {
    fetchServices();
  }, []);
  
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };
  
  const addService = async () => {
    if (newService.trim() !== '' && newDescription.trim() !== '') {
      try {
        const response = await axios.post(`${API_URL}/services`, { service: newService, description: newDescription });
        setServices([...services, response.data]);
        setNewService('');
        setNewDescription('');
      } catch (error) {
        console.error('Error adding service:', error);
      }
    }
  };
  
  const removeService = async (id) => {
    try {
      await axios.delete(`${API_URL}/services/${id}`);
      setServices(services.filter(service => service._id !== id));
    } catch (error) {
      console.error('Error removing service:', error);
    }
  };
  
  const startEditing = (service) => {
    setEditingId(service._id);
    setEditName(service.service);
    setEditDescription(service.description);
  };
  
  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
    setEditDescription('');
  };
  
  const saveEdit = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/services/${id}`, { service: editName, description: editDescription });
      setServices(services.map(service => 
        service._id === id ? response.data : service
      ));
      setEditingId(null);
    } catch (error) {
      console.error('Error editing service:', error);
    }
  };
  const [donations, setDonations] = useState([]);
  const [newDonation, setNewDonation] = useState({ name: '', amount: '' });
  const [editingDonationId, setEditingDonationId] = useState(null);
  const [editDonationName, setEditDonationName] = useState('');
  const [editDonationAmount, setEditDonationAmount] = useState('');
  useEffect(() => {
    fetchDonations();
  }, []);
  
  const fetchDonations = async () => {
    try {
      const response = await axios.get(`${API_URL}/donations`);
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };
  
  const addDonation = async () => {
    if (newDonation.name && newDonation.amount) {
      try {
        const response = await axios.post(`${API_URL}/donations`, newDonation);
        setDonations([...donations, response.data]);
        setNewDonation({ name: '', amount: '' });
      } catch (error) {
        console.error('Error adding donation:', error);
      }
    }
  };
  
  const startEditingDonation = (donation) => {
    setEditingDonationId(donation._id);
    setEditDonationName(donation.name);
    setEditDonationAmount(donation.amount.toString());
  };
  
  const cancelEditingDonation = () => {
    setEditingDonationId(null);
    setEditDonationName('');
    setEditDonationAmount('');
  };
  
  const saveEditDonation = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/donations/${id}`, { 
        name: editDonationName, 
        amount: parseInt(editDonationAmount) 
      });
      setDonations(donations.map(donation => 
        donation._id === id ? response.data : donation
      ));
      setEditingDonationId(null);
    } catch (error) {
      console.error('Error editing donation:', error);
    }
  };
  
  const removeDonation = async (id) => {
    try {
      await axios.delete(`${API_URL}/donations/${id}`);
      setDonations(donations.filter(d => d._id !== id));
    } catch (error) {
      console.error('Error removing donation:', error);
    }
  };
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');
  const [editingAnnouncementId, setEditingAnnouncementId] = useState(null);
  const [editAnnouncementTitle, setEditAnnouncementTitle] = useState('');
  const [editAnnouncementContent, setEditAnnouncementContent] = useState('');
  useEffect(() => {
    fetchAnnouncements();
  }, []);
  
  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${API_URL}/announcements`);
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };
  
  const addAnnouncement = async () => {
    if (newAnnouncementTitle && newAnnouncementContent) {
      try {
        const response = await axios.post(`${API_URL}/announcements`, {
          name: newAnnouncementTitle,
          content: newAnnouncementContent
        });
        setAnnouncements([...announcements, response.data]);
        setNewAnnouncementTitle('');
        setNewAnnouncementContent('');
      } catch (error) {
        console.error('Error adding announcement:', error);
      }
    }
  };
  
  const startEditingAnnouncement = (announcement) => {
    setEditingAnnouncementId(announcement._id);
    setEditAnnouncementTitle(announcement.name);
    setEditAnnouncementContent(announcement.content);
  };
  
  const cancelEditingAnnouncement = () => {
    setEditingAnnouncementId(null);
    setEditAnnouncementTitle('');
    setEditAnnouncementContent('');
  };
  
  const saveEditAnnouncement = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/announcements/${id}`, {
        name: editAnnouncementTitle,
        content: editAnnouncementContent
      });
      setAnnouncements(announcements.map(announcement =>
        announcement._id === id ? response.data : announcement
      ));
      setEditingAnnouncementId(null);
    } catch (error) {
      console.error('Error editing announcement:', error);
    }
  };
  
  const removeAnnouncement = async (id) => {
    try {
      await axios.delete(`${API_URL}/announcements/${id}`);
      setAnnouncements(announcements.filter(a => a._id !== id));
    } catch (error) {
      console.error('Error removing announcement:', error);
    }
  };

  const [contactInfos, setContactInfos] = useState([]);
  const [editingContactId, setEditingContactId] = useState(null);
  const [newContactInfo, setNewContactInfo] = useState({ email: '', mobile: '', timings: '' });
  useEffect(() => {
    fetchContactInfos();
  }, []);
  
  const fetchContactInfos = async () => {
    try {
      const response = await axios.get(`${API_URL}/contacts`);
      setContactInfos(response.data);
    } catch (error) {
      console.error('Error fetching contact infos:', error);
    }
  };
  const handleNewContactChange = (field, value) => {
    setNewContactInfo({ ...newContactInfo, [field]: value });
  };
  
  const createContactInfo = async () => {
    try {
      const response = await axios.post(`${API_URL}/contacts`, newContactInfo);
      setContactInfos([...contactInfos, response.data]);
      setNewContactInfo({ email: '', mobile: '', timings: '' });
    } catch (error) {
      console.error('Error creating contact info:', error);
    }
  };
  
  const startEditingContact = (id) => {
    setEditingContactId(id);
  };
  
  const handleContactChange = (id, field, value) => {
    setContactInfos(contactInfos.map(contact => 
      contact._id === id ? { ...contact, [field]: value } : contact
    ));
  };
  
  const saveContactInfo = async (id) => {
    try {
      const contactToUpdate = contactInfos.find(contact => contact._id === id);
      const response = await axios.put(`${API_URL}/contacts/${id}`, contactToUpdate);
      setContactInfos(contactInfos.map(contact => 
        contact._id === id ? response.data : contact
      ));
      setEditingContactId(null);
    } catch (error) {
      console.error('Error saving contact info:', error);
    }
  };
  
  const cancelEditingContact = () => {
    setEditingContactId(null);
    fetchContactInfos(); 
  };
  
  const deleteContactInfo = async (id) => {
    try {
      await axios.delete(`${API_URL}/contacts/${id}`);
      setContactInfos(contactInfos.filter(contact => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact info:', error);
    }
  };
  const handleLogout = () => {
    setIsDropdownOpen(false);
    navigate('/');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'Dashboard':
        return(
          <>
            <h1 className='heading'>Welcome to the Darshan Ease Temple Representative Dashboard</h1>
            <br></br>
            <h2 className='infoooo'>Here you can view, add, edit and remove your Temple Services, Donation Schemes, Announcements and Contact Info as a temple representative for the temple</h2>
          </>
        );
      case 'Services':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Welcome Sashidhar Reddy</h2>
            <div className="mb-4">
              <input
                type="text"
                className="border rounded p-2 mr-2"
                placeholder="Enter new service"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
              />
              <input
                type="text"
                className="border rounded p-2 mr-2"
                placeholder="Enter service description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded"
                onClick={addService}
              >
                Add Service
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <div key={service._id} className="bg-gray-200 rounded-lg p-4">
                  <div className="bg-gray-500 rounded-lg p-4 mb-2">
                  <img src="/pictures/pngaaa.com-1646422.png" alt="Service" className="w-16 h-16 mx-auto mb-2" />
                  </div>
                  {editingId === service._id ? (
                    <>
                      <input 
                        type="text" 
                        className="border rounded p-2 mb-2 w-full" 
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                      <input 
                        type="text" 
                        className="border rounded p-2 mb-2 w-full" 
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                      <button 
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2" 
                        onClick={() => saveEdit(service._id)}
                      >
                        Save
                      </button>
                      <button 
                        className="bg-gray-500 text-white px-2 py-1 rounded" 
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="font-bold">{service.service}</h3>
                      <p className="text-sm">{service.description}</p>
                      <div className="mt-2">
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                          onClick={() => removeService(service._id)}
                        >
                          Remove
                        </button>
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded"
                          onClick={() => startEditing(service)}
                        >
                          Edit
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
        case 'Donations':
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 bg-orange-500 rounded-lg text-white p-4">Temple Donation</h2>
      <div className="mb-4 bg-white shadow-lg rounded-lg p-4">
        <h3 className="font-bold mb-2">Add New Donation</h3>
        <input
          type="text"
          className="border rounded p-2 mr-2 mb-2 w-full"
          placeholder="Donation Name"
          value={newDonation.name}
          onChange={(e) => setNewDonation({...newDonation, name: e.target.value})}
        />
        <input
          type="number"
          className="border rounded p-2 mr-2 mb-2 w-full"
          placeholder="Amount"
          value={newDonation.amount}
          onChange={(e) => setNewDonation({...newDonation, amount: e.target.value})}
        />
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded w-full"
          onClick={addDonation}
        >
          Add Donation
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donations.map((donation) => (
          <div key={donation._id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
            {editingDonationId === donation._id ? (
              <>
                <input 
                  type="text" 
                  className="border rounded p-2 mb-2 w-full" 
                  value={editDonationName}
                  onChange={(e) => setEditDonationName(e.target.value)}
                />
                <input 
                  type="number" 
                  className="border rounded p-2 mb-2 w-full" 
                  value={editDonationAmount}
                  onChange={(e) => setEditDonationAmount(e.target.value)}
                />
                <button 
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2" 
                  onClick={() => saveEditDonation(donation._id)}
                >
                  Save
                </button>
                <button 
                  className="bg-gray-500 text-white px-2 py-1 rounded" 
                  onClick={cancelEditingDonation}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className="font-bold mb-2">{donation.name}</h3>
                <p className="text-orange-500 font-bold mb-2">₹{donation.amount}</p>
                <div className="flex justify-between">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => startEditingDonation(donation)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => removeDonation(donation._id)}
                  >
                    Remove
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
        case 'Visitors Stats':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Visitor Statistics</h2>
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-4xl font-bold text-orange-600">500</p>
                  <p className="text-gray-600">Website Views</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-orange-600">200</p>
                  <p className="text-gray-600">Temple Registrations</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-orange-600">150</p>
                  <p className="text-gray-600">Temple Donations</p>
                </div>
              </div>
            </div>
          </div>
        );
        case 'Contact info':
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Add New Contact Info</h3>
        {['email', 'mobile', 'timings'].map((field) => (
          <input
            key={field}
            type="text"
            className="border rounded p-2 mb-2 mr-2"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={newContactInfo[field]}
            onChange={(e) => handleNewContactChange(field, e.target.value)}
          />
        ))}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={createContactInfo}
        >
          Add Contact Info
        </button>
      </div>
      {contactInfos.map((contact) => (
        <div key={contact._id} className="border-t pt-4 mb-4">
          {editingContactId === contact._id ? (
            <>
              {['email', 'mobile', 'timings'].map((field) => (
                <div key={field} className="mb-2">
                  <label className="font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                  <input
                    type="text"
                    className="border rounded p-2 ml-2"
                    value={contact[field]}
                    onChange={(e) => handleContactChange(contact._id, field, e.target.value)}
                  />
                </div>
              ))}
              <button
                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => saveContactInfo(contact._id)}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-2 py-1 rounded"
                onClick={cancelEditingContact}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {['email', 'mobile', 'timings'].map((field) => (
                <p key={field}><span className="font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}:</span> {contact[field]}</p>
              ))}
              <div className="mt-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => startEditingContact(contact._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteContactInfo(contact._id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
          case 'Announcements':
          return (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Announcements</h2>
              <div className="mb-4">
                <input
                  type="text"
                  className="border rounded p-2 mr-2"
                  placeholder="Announcement Title"
                  value={newAnnouncementTitle}
                  onChange={(e) => setNewAnnouncementTitle(e.target.value)}
                />
                <input
                  type="text"
                  className="border rounded p-2 mr-2"
                  placeholder="Announcement Content"
                  value={newAnnouncementContent}
                  onChange={(e) => setNewAnnouncementContent(e.target.value)}
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={addAnnouncement}
                >
                  Add Announcement
                </button>
              </div>
              {announcements.map(announcement => (
                <div key={announcement._id} className="mb-4 p-4 border rounded">
                  {editingAnnouncementId === announcement._id ? (
                    <>
                      <input 
                        type="text" 
                        className="border rounded p-2 mb-2 w-full" 
                        value={editAnnouncementTitle}
                        onChange={(e) => setEditAnnouncementTitle(e.target.value)}
                      />
                      <input 
                        type="text" 
                        className="border rounded p-2 mb-2 w-full" 
                        value={editAnnouncementContent}
                        onChange={(e) => setEditAnnouncementContent(e.target.value)}
                      />
                      <button 
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2" 
                        onClick={() => saveEditAnnouncement(announcement._id)}
                      >
                        Save
                      </button>
                      <button 
                        className="bg-gray-500 text-white px-2 py-1 rounded" 
                        onClick={cancelEditingAnnouncement}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="font-bold">{announcement.name}</h3>
                      <p>{announcement.content}</p>
                      <div className="mt-2">
                        <button 
                          className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded"
                          onClick={() => startEditingAnnouncement(announcement)}
                        >
                          Edit
                        </button>
                        <button 
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => removeAnnouncement(announcement._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          );
        }
      }

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
      <p className="text-xl font-semibold">Darshan Ease</p>
    </div>
  </div>
</header>

      <div className="flex flex-1">
        <div className="w-1/4 bg-gray-100 p-4">
          <nav>
            <ul className="space-y-2">
              {['Dashboard', 'Services', 'Donations', 'Visitors Stats', 'Announcements', 'Contact info'].map((item) => (
                <li 
                  key={item} 
                  className={`flex items-center cursor-pointer p-2 rounded ${activeSection === item ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-100'}`}
                  onClick={() => handleNavigation(item)}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Temple Name</h3>
            <ul className="space-y-2">
              {['Ahobilam'].map((team) => (
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-md bg-gray-300 mr-2 flex items-center justify-center text-xs font-medium">
                    {team[0]}
                  </span>
                  {team}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
  <div className="relative">
    <button
      onClick={toggleDropdown}
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded flex items-center justify-between"
    >
      <span>{userName}</span>
      <i className="bi bi-arrow-down ml-1"></i>
    </button>
    {isDropdownOpen && (
      <div className="absolute left-0 right-0 mt-2 bg-white rounded-md shadow-lg py-1">
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
        </div>

        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>

      <footer className="bg-gray-200 p-4">
        <div className="container mx-auto text-center text-gray-600">
          © 2024 DarshanEase, Inc
        </div>
      </footer>
    </div>
  );
}
