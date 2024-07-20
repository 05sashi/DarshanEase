import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from "jspdf";

const API_URL = 'http://localhost:5500';
const DEFAULT_USERNAME = 'Sashi';

export default function Userdash() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Sashi');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [donations, setDonations] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [contactInfos, setContactInfos] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUserName(response.data.name); // Assuming the API returns an object with a 'name' property
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };
  const handleItemSelection = (index) => {
    setSelectedItems(prevItems => {
      if (prevItems.includes(index)) {
        return prevItems.filter(item => item !== index);
      } else {
        return [...prevItems, index];
      }
    });
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select items to checkout.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(30);
    doc.text("Darshan Ease",70,20);

    doc.setFontSize(18);
    doc.text("Booking Confirmation", 20, 30);
    
    doc.setFontSize(12);
    doc.text(`User Name: ${DEFAULT_USERNAME}`, 20, 40);
    doc.text("Booked Services:", 20, 50);

    let yOffset = 60;
    selectedItems.forEach((index) => {
      const item = cart[index];
      doc.text(`- ${item.service} (${item.temple}) - ₹${item.price}`, 30, yOffset);
      yOffset += 10;
    });

    const total = selectedItems.reduce((sum, index) => sum + cart[index].price, 0);
    doc.text(`Total: ₹${total}`, 20, yOffset + 10);

    doc.save("booking_confirmation.pdf");

    // Clear selected items from cart
    const newCart = cart.filter((_, index) => !selectedItems.includes(index));
    setCart(newCart);
    setSelectedItems([]);
    localStorage.setItem('cart', JSON.stringify(newCart));
    alert("Checkout successful! Your booking confirmation has been downloaded.");
  };

const fetchContactInfos = async () => {
  try {
    const response = await axios.get(`${API_URL}/contacts`);
    setContactInfos(response.data);
  } catch (error) {
    console.error('Error fetching contact infos:', error);
  }
};
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const fetchDonations = async () => {
    try {
      const response = await axios.get(`${API_URL}/donations`);
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${API_URL}/announcements`);
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  useEffect(() => {
    if (selectedTemple) {
      fetchDonations();
      fetchAnnouncements();
    }
  }, [selectedTemple]);

  const handleDonate = (donation) => {
    alert(`Thank you for your interest in donating ₹${donation.amount} for ${donation.name}!`);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (selectedTemple) {
      fetchServices();
      fetchDonations();
      fetchAnnouncements();
      fetchContactInfos();
    }
  }, [selectedTemple]);
  const renderContactInfo = () => (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Contact Information</h2>
      {contactInfos.map(contact => (
        <div key={contact._id} className="mb-4 p-4 border rounded bg-white">
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Mobile:</strong> {contact.mobile}</p>
          <p><strong>Timings:</strong> {contact.timings}</p>
        </div>
      ))}
    </div>
  );

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    navigate('/user-login');
  };

  const handleTempleClick = (templeName) => {
    setSelectedTemple(templeName);
    setShowCart(false);
  };

  const handleAddToCart = (service) => {
    const newItem = { ...service, temple: selectedTemple };
    const itemExists = cart.some(
      (item) => item.service === newItem.service && item.temple === newItem.temple
    );

    if (itemExists) {
      alert(`${service.service} from ${selectedTemple} is already in the cart!`);
    } else {
      const newCart = [...cart, newItem];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      console.log(`Added ${service.service} from ${selectedTemple} to cart`);
      alert(`${service.service} from ${selectedTemple} added to cart!`);
    }
  };

  const handleHomeClick = () => {
    setSelectedTemple(null);
    setShowCart(false);
  };

  const handleCartClick = () => {
    setShowCart(true);
    setSelectedTemple(null);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const renderTempleSelection = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Temples</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleTempleClick('Ahobilam')}
        >
          <img 
            src="/pictures/ahobilam.jpg" 
            alt="Ahobilam Temple" 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-xl mb-2">Ahobilam</h3>
            <p className="text-gray-700 text-base">
              Click to view services and make bookings for Ahobilam Temple.
            </p>
          </div>
        </div>
        <div 
          className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleTempleClick('Tirupathi')}
        >
          <img 
            src="/pictures/tirupathi.jpg" 
            alt="Tirupathi Temple" 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-xl mb-2">Tirupathi</h3>
            <p className="text-gray-700 text-base">
              Click to view services and make bookings for Tirupathi Temple.
            </p>
          </div>
        </div>
        <div 
          className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleTempleClick('Yadhadri')}
        >
          <img 
            src="/pictures/Yadhadhri.jpg" 
            alt="Yadhadri Temple" 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-xl mb-2">Yadhadri</h3>
            <p className="text-gray-700 text-base">
              Click to view services and make bookings for Yadhadri Temple.
            </p>
          </div>
        </div>



<div 
          className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleTempleClick('Kanchipuram')}
        >
          <img 
            src="/pictures/Kanchipuram.jpeg" 
            alt="Kanchipuram Temple" 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-xl mb-2">Kanchipuram</h3>
            <p className="text-gray-700 text-base">
              Click to view services and make bookings for Kanchipuram Temple.
            </p>
          </div>
        </div>


<div 
          className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleTempleClick('Thiruvananthapuram')}
        >
          <img 
            src="/pictures/Thiruvananthapuram.jpeg" 
            alt="Thiruvananthapuram Temple" 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-xl mb-2">Thiruvananthapuram</h3>
            <p className="text-gray-700 text-base">
              Click to view services and make bookings for Thiruvananthapuram Temple.
            </p>
          </div>
        </div>






<div 
          className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleTempleClick('Kedarnath')}
        >
          <img 
            src="/pictures/Kedarnath.jpeg" 
            alt="Kedarnath Temple" 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-xl mb-2">Kedarnath</h3>
            <p className="text-gray-700 text-base">
              Click to view services and make bookings for Kedarnath Temple.
            </p>
          </div>
        </div>

<div 
          className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleTempleClick('Badrinath')}
        >
          <img 
            src="/pictures/Badrinath.jpeg" 
            alt="Badrinath Temple" 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-xl mb-2">Badrinath</h3>
            <p className="text-gray-700 text-base">
              Click to view services and make bookings for Badrinath Temple.
            </p>
          </div>
        </div>

<div 
          className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleTempleClick('Varanasi')}
        >
          <img 
            src="/pictures/Varanasi.jpg" 
            alt="Varanasi Temple" 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-xl mb-2">Varanasi</h3>
            <p className="text-gray-700 text-base">
              Click to view services and make bookings for Varanasi Temple.
            </p>
          </div>
        </div>
        <div 
          className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleTempleClick('Chickmangalur')}
        >
          <img 
            src="/pictures/Chickmangalur.jpeg" 
            alt="Chickmangalur Temple" 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-xl mb-2">Chickmangalur</h3>
            <p className="text-gray-700 text-base">
              Click to view services and make bookings for Chickmangalur Temple.
            </p>
          </div>
        </div>


      </div>
    </div>
  );

  const renderTempleServices = () => (
    <div>
    <div className="flex justify-end">
      <button 
        className="mb-4 bg-orange-500 text-white px-4 py-2 rounded"
        onClick={() => setSelectedTemple(null)}
      >
        Back to Temples
      </button>
      </div>
      <h2 className="text-2xl font-bold mb-4 flex justify-center">{selectedTemple} Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service._id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <div className="bg-gray-500 rounded-lg p-4 mb-2">
              <img src="/pictures/pngaaa.com-1646422.png" alt="Service" className="w-16 h-16 mx-auto mb-2" />
            </div>
            <h3 className="font-bold mb-2">{service.service}</h3>
            <p className="text-sm mb-2">{service.description}</p>
            <p className="text-sm mb-2">Price: ₹{service.price}</p>
            <p className="text-sm mb-2">Timings: {service.timings}</p>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded w-full"
              onClick={() => handleAddToCart(service)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {renderDonations()}
      {renderAnnouncements()}
      {renderContactInfo()}
    </div>
  );

  const renderCart = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden p-4 mb-4 flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(index)}
                  onChange={() => handleItemSelection(index)}
                  className="mr-4"
                />
                <div>
                  <h3 className="font-bold">{item.service}</h3>
                  <p className="text-sm">Temple: {item.temple}</p>
                  <p className="text-sm">Price: ₹{item.price}</p>
                </div>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleRemoveFromCart(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <p className="font-bold">Total: ₹{cart.reduce((total, item) => total + item.price, 0)}</p>
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full"
              onClick={handleCheckout}
            >
              Checkout Selected Items
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderDonations = () => (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Donations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donations.map((donation) => (
          <div key={donation._id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <h3 className="font-bold mb-2">{donation.name}</h3>
            <p className="text-orange-500 font-bold mb-2">₹{donation.amount}</p>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
              onClick={() => handleDonate(donation)}
            >
              Donate
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnnouncements = () => (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Announcements</h2>
      {announcements.map(announcement => (
        <div key={announcement._id} className="mb-4 p-4 border rounded bg-white">
          <h3 className="font-bold">{announcement.name}</h3>
          <p>{announcement.content}</p>
        </div>
      ))}
    </div>
  );

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
            <p className="text-xl font-semibold text-white">
              Darshan Ease {selectedTemple ? `- ${selectedTemple}` : ''}
            </p>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleHomeClick}
              className="bg-white text-orange-500 font-bold py-2 px-4 rounded mr-2"
            >
              Home
            </button>
            <button
              onClick={handleCartClick}
              className="bg-white text-orange-500 font-bold py-2 px-4 rounded mr-2"
            >
              Cart
            </button>
            <div className="relative">
            <button
  onClick={toggleDropdown}
  className="bg-white text-orange-500 font-bold py-2 px-4 rounded"
>
  {DEFAULT_USERNAME}
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
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {showCart ? renderCart() : selectedTemple ? renderTempleServices() : renderTempleSelection()}
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Darshan Ease. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
