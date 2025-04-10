// Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  return (
    <nav className="navbar">
      <h1>Eco de l'île</h1>
      <input
        type="text"
        placeholder="Rechercher..."
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/contact-us">Contact Us</Link>
      </div>
    </nav>
  );
};

export default Navbar;

