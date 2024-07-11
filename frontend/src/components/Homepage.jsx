import React from "react";
import { useNavigate } from 'react-router-dom';
import '../App.css'

export default function Homepage() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <header class="custom-mid d-flex flex-wrap align-items-center justify-content-between p-3 ps-4">
          <div class="d-flex align-items-center">
            <img
              class="logo"
              src="/pictures/pngaaa.com-1646422.png"
              alt="Hindu logo"
            />
            <p class="mb-0 ms-2">Darshan Ease</p>
          </div>
        </header>
      </div>
      <div class="container p=0 my-3">
        <h1 style={{ textAlign: "center" }}>Select your mode of login:</h1>
        <div class="row justify-content-center align-items-center text-center">
          <div class="col-lg-4 p-3">
            <input
              className="primary-btn btn custom-mid"
              type="image"
              src="./public/pictures/user.png"
              height="140"
              width="140"
              onClick={() => navigate('/user-login')}
            />
            <h2 class="fw-normal">User</h2>
          </div>
          <div class="col-lg-4 p-3">
            <input
              className="primary-btn btn custom-mid"
              type="image"
              src="./public/pictures/admin.png"
              height="140"
              width="140"
              onClick={() => navigate('/login')}
            />
            <h2 class="fw-normal">Admin</h2>
          </div>
          <div className="col-lg-4 p-3">
        <input
          className="primary-btn btn custom-mid"
          type="image"
          src="./public/pictures/Temple.png"
          height="140"
          width="140"
          onClick={() => navigate('/db-login')}
        />
        <h2 className="fw-normal">Temple Representative</h2>
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
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-2">
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