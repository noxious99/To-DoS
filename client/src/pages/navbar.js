import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useLogout } from "../context/useLogout";
import { useAuthContext } from "../context/useAuthContext";
import "../style/navbar.css";
import logo from "../style/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleClick = () => {
    logout();
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" style={{ width: "150px" }} />
        </Link>
      </div>
      {/* Toggle button for small screens */}
      <button className="menu-toggle" onClick={toggleMenu}>
        <div className="menu-toggle-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      {/* Links */}
      <div className={isOpen ? "nav-links active" : "nav-links"}>
        {!user && (
          <div>
            <Link to="/login" onClick={toggleMenu}>
              Login
            </Link>
            <Link to="/register" onClick={toggleMenu}>
              Register
            </Link>
          </div>
        )}
        {user && (
          <div>
            <span>{user.email}</span>
            <button onClick={handleClick}>LogOut</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
