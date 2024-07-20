import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../App.css';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import { FaUserCircle, FaLock, FaBolt, FaSmile, FaShieldAlt } from 'react-icons/fa';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

  const navigate = useNavigate();

  const switchToLogin = () => {
    navigate('/login');
  };

  const handlesignup = async (e) => {
    e.preventDefault();
    try {
      const newadmin = {
        name,
        email,
        mobile,
        password,
      };
      setName('');
      setEmail('');
      setMobile('');
      setPassword('');
      if (name === '' || mobile === '' || email === '' || password === '') {
        alert('Please fill all the fields');
        return;
      }
      await axios.post('http://localhost:5500/admins', newadmin);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-300">
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img className="h-10 w-auto" src="/pictures/pngaaa.com-1646422.png" alt="Hindu logo" />
            <p className="ml-2 text-xl font-semibold text-orange-500">Darshan Ease</p>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
              Login/Signup Options
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-gray-700">
              <Dropdown.Item className="text-gray-300 hover:bg-gray-600" onClick={() => navigate('/user-signup')}>Signup as User</Dropdown.Item>
              <Dropdown.Item className="text-gray-300 hover:bg-gray-600" onClick={() => navigate('/db-signup')}>Signup as Representative</Dropdown.Item>
              <Dropdown.Item className="text-gray-300 hover:bg-gray-600" onClick={switchToLogin}>Login</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>

      <main className="flex-grow">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-16">
          <div className="container mx-auto px-4 flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-4xl font-bold text-orange-500 mb-4">Darshan Ease</h1>
              <p className="text-lg text-gray-400 mb-6">
                Streamline online bookings for religious ceremonies and temple visits with our user-friendly platform. Experience convenience and peace of mind in your spiritual journey.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Admin Signup</h2>
                <form onSubmit={handlesignup}>
                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <div className="flex items-center border border-gray-700 rounded-md bg-gray-700">
                      <input
                        type="text"
                        id="name"
                        className="w-full p-2 pl-3 bg-gray-700 text-gray-300"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
                      Email address
                    </label>
                    <div className="flex items-center border border-gray-700 rounded-md bg-gray-700">
                      <input
                        type="email"
                        id="email"
                        className="w-full p-2 pl-3 bg-gray-700 text-gray-300"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="mobile">
                      Mobile Number
                    </label>
                    <div className="flex items-center border border-gray-700 rounded-md bg-gray-700">
                      <input
                        type="text"
                        id="mobile"
                        className="w-full p-2 pl-3 bg-gray-700 text-gray-300"
                        placeholder="Enter your mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
                      Password
                    </label>
                    <div className="flex items-center border border-gray-700 rounded-md bg-gray-700">
                      <input
                        type="password"
                        id="password"
                        className="w-full p-2 pl-3 bg-gray-700 text-gray-300"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Sign up
                  </button>
                </form>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Already an existing user?{" "}
                    <a href="#" onClick={switchToLogin} className="text-orange-500 hover:text-orange-400">
                      Login
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <FaBolt className="text-5xl text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-300">Fast</h3>
                <p className="text-gray-400">
                  We offer fast, seamless online bookings for temple visits and ceremonies, ensuring a quick and hassle-free experience.
                </p>
              </div>
              <div className="text-center">
                <FaSmile className="text-5xl text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-300">Easy</h3>
                <p className="text-gray-400">
                  We provide a user-friendly platform for effortless online bookings, making temple visits and ceremonies simple and convenient.
                </p>
              </div>
              <div className="text-center">
                <FaShieldAlt className="text-5xl text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-300">Reliable</h3>
                <p className="text-gray-400">
                  We ensure a reliable and safe experience with secure transactions and dependable service for all your temple visits and ceremonies.
                </p>
              </div>
            </div>
          </div>
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
