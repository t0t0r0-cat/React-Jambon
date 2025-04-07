import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; // Import the SearchBar component
import './Navbar.css'; // Import the CSS for Navbar styles

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu on mobile
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Eco de l'île</Link>
      </div>

      {/* Search bar */}
      <div className="navbar-search-bar-container">
        <SearchBar onSearch={onSearch} />
      </div>

      {/* Toggle menu button for mobile */}
      <button className="menu-toggle" onClick={handleMenuToggle}>
        ☰
      </button>

      {/* Navigation links */}
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/">|Home|</Link>
        </li>
        <li>
          <Link to="/google-sucks">|Google Sucks|</Link>
        </li>
        <li>
          <Link to="/resources">|Page Resource|</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
