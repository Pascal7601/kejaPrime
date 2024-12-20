import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';


function Navbar() {
  // Destructure values from AuthContext
  const { isLoggedIn, userType, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/sign-in');
    logout(); // Call the logout function from AuthContex
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h1>
            Keja<span>Prime</span>
          </h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* Home link always available */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {isLoggedIn ? (
              <>
                {/* Tenant-specific links */}
                {userType === 'tenant' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/dashboard">
                        Apartments
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                      <Link className="nav-link" to="/listings">
                        Listings
                      </Link>
                    </li> */}
                    <li className="nav-item">
                      <Link className="nav-link" to="/feeds">
                        Feeds
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">
                        Profile
                      </Link>
                    </li>
                  </>
                )}

                {/* Landlord-specific links */}
                {userType === 'landlord' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/dashboard">
                        Apartments
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">
                        Profile
                      </Link>
                    </li>
                  </>
                )}

                {/* Logout button available when logged in */}
                <li className="nav-item">
                  <button className="nav-link btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              // Display Sign In/Sign Up links when not logged in
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-in">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-up">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
