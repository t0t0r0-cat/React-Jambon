// Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Default to collapsed

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <h1>Eco de l'île</h1>
      </Link>
      <button className="navbar-toggle" onClick={toggleNavbar}>
        ☰
      </button>
      <div className={`navbar-links ${isCollapsed ? 'collapsed' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/contact-us">Contact Us</Link>
      </div>
      <input
        type="text"
        placeholder="Rechercher..."
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />
    </nav>
  );
};

export default Navbar;

