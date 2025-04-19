// Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../App.css';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Night mode by default

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
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
      <button className="darkmode-toggle" onClick={toggleDarkMode}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
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

