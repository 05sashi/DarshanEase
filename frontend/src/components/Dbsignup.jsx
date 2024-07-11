import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../Sapp.css'
import axios from 'axios'

export default function Dbsignup() {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [mobile,setMobile]=useState('');
  const [tname,setTname]=useState('');
  const [taddress,setTaddress]=useState('');

  const navigate = useNavigate();

  const switchToLogin = () => {
    navigate('/db-login');
  };

  const handlesignup = async (e) => {
    e.preventDefault()
    try {
      const newtrep = {
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        tname:tname,
        taddress:taddress
      }
      setName('')
      setEmail('')
      setMobile('')
      setPassword('')
      setTname('')
      setTaddress('')
      if(name==='' || mobile==='' || email==='' || password==='' || tname==='' || taddress===''){
        alert('Please fill all the fields')
        return
      }
      const response = await axios.post('http://localhost:5500/templereps', newtrep)
      navigate('/db-login');
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div>
        <header className="custom-mid d-flex flex-wrap align-items-center justify-content-between p-3 ps-4">
          <div className="d-flex align-items-center">
            <img className="logo" src="/pictures/pngaaa.com-1646422.png" alt="Hindu logo"/>
            <p className="mb-0 ms-2">Darshan Ease</p>
          </div>
          <div className="text-end">
          <button type="button" className="btn btn-primary me-2" onClick={()=>{
            navigate('/user-signup')
          }}>Signup as User</button>
          <button type="button" className="btn btn-primary me-2" onClick={()=>{
            navigate('/signup')
          }}>Signup as Admin</button>    
        <button type="button" className="btn btn-primary me-2" onClick={switchToLogin}>Login</button>
      </div>
        </header>
      </div>

      <div className="bgimg">
        <div className="row align-items-center g-lg-5 py-5 mx-3 my-0">
          <div className="col-md-10 mx-auto col-lg-5 mr-0">
            <form className="p-4 p-md-5 border rounded-3 custom-bg-color" onSubmit={handlesignup}>
              <h2 className="text-center fw-bold login-heading">Temple Administrative Singup</h2>
              <hr />
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Name"
                  onChange={(e)=>{
                    setName(e.target.value)
                  }}
                  value={name}
                />
                <label htmlFor="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e)=>{
                    setEmail(e.target.value)
                  }}
                  value={email}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="XXXXXXXXXX"
                  onChange={(e)=>{
                    setMobile(e.target.value)
                  }}
                  value={mobile}

                />
                <label htmlFor="floatingInput">Mobile Number</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e)=>{
                    setPassword(e.target.value)
                  }}
                  value={password}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="templename"
                  onChange={(e)=>{
                    setTname(e.target.value)
                  }}
                  value={tname}
                />
                <label htmlFor="floatingInput">Temple Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="templeaddress"
                  onChange={(e)=>{
                    setTaddress(e.target.value)
                  }}
                  value={taddress}
                />
                <label htmlFor="floatingInput">Temple Address</label>
              </div>
              <br />
              <br />
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Sign up
              </button>
              <hr className="my-4" />
              <small className="text-body-secondary">
                Already an existing user?{" "}
                <a href="#" onClick={switchToLogin}>
                  Login
                </a>
              </small>
            </form>
          </div>

          <div className="col-lg-7 text-center text-lg-start mr-0">
            <div className="text-content">
              <h1 className="custom-orange display-4 fw-bold lh-1 text-body-emphasis mb-3">
                Darshan Ease
              </h1>
              <br />
              <p className="col-lg-10 fw-bold fs-4 custom-text">
                Darshan Ease streamlines online bookings for religious
                ceremonies and temple visits, offering a seamless, user-friendly
                experience. It handles schedules, notifications, and payments,
                making spiritual journeys convenient and hassle-free for
                devotees.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="custom-mid">
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3 m-3 my-0">
          <div className="col d-flex align-items-start">
            <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
            <div>
              <h3 className="fs-2 text-body-emphasis">Fast</h3>
              <p>
                We offers fast, seamless online bookings for temple visits and
                ceremonies, ensuring a quick and hassle-free experience.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
              {" "}
            </div>
            <div>
              <h3 className="fs-2 text-body-emphasis text-left">Easy</h3>
              <p>
                We provides a user-friendly platform for effortless online
                bookings, making temple visits and ceremonies simple and
                convenient.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
              {" "}
            </div>
            <div>
              <h3 className="fs-2 text-body-emphasis">Reliable</h3>
              <p>
                We ensures a reliable and safe experience with secure
                transactions and dependable service for all your temple visits
                and ceremonies.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3">
          <div className="col-md-4 d-flex align-items-center">
            <a
              href="/"
              className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
            ></a>
            <span className="mb-3 mb-md-0 text-body-secondary">
              © 2024 DarshanEase, Inc
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
