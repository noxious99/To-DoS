import React, { useState } from "react";
import "../style/navbar.css"; // Import your CSS file for styling

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to manage menu visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle menu visibility
  };

  return (
    <div className="navbar">
      <div className="logo">
        <a href="#">Your Logo</a>
      </div>
      <button className="menu-toggle" aria-label="Toggle Menu" onClick={toggleMenu}>
        <div className={`menu-toggle-icon ${isOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">My Profile</a>
        </li>
        <li>
          <a href="#">Sign Out</a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
