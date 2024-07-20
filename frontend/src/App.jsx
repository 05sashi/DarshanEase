import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dblogin from './components/Dblogin';
import Dbsignup from './components/Dbsignup'
import Login from './components/Login';
import Signup from './components/SignUp';
import Userlogin from './components/Userlogin';
import Usersignup from './components/Usersignup';
import Dash from './components/Dash';
import Userdash from './components/Userdash';
import Admindash from './components/Admindash';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Dblogin />}/>
        <Route path="/db-login" element={<Dblogin />} />
        <Route path="/db-signup" element={<Dbsignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-login" element={<Userlogin />} />
        <Route path="/user-signup" element={<Usersignup />} />
        <Route path="/user-dashboard" element={<Userdash/>}/>
        <Route path="/db-dash" element={<Dash />} />
        <Route path="/admin-dashboard" element={<Admindash/>}/>
      </Routes>
    </Router>
  );
}

export default App;