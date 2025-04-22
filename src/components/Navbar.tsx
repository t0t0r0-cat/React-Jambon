// Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../styles/App.css';
import '../styles/Navbar.css';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Night mode by default

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }, [darkMode]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <a href="/" className="brand">Éco de l'île</a>
      <div className="navbar-search-bar-container">
        <SearchBar onSearch={onSearch} />
      </div>
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        ☰
      </button>
      {/* Switch for dark/light mode */}
      <label className="switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={toggleDarkMode}
          aria-label="Toggle dark mode"
        />
        <span className="slider"></span>
      </label>
      <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <li>
          <Link to="/resources">Ressources</Link>
        </li>
        <li>
          <Link to="/about-us">À propos</Link>
        </li>
        <li>
          <Link to="/contact-us">Contactez-nous</Link>
        </li>
        <li>
          <Link to="https://ile.csspo.gouv.qc.ca/">Site Internet De L'ecole</Link>
        </li>
        <li>
          <Link to="/espace-jambon">Espace Jambon</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

