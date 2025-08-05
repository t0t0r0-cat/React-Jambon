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
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
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
    setDarkMode((prev:boolean) => !prev);
  };

  return (
    <>
    <nav className="navbar">
      <a href="/" className="brand">Éco de l'île</a>
      <div className="navbar-search-bar-container">
        <SearchBar onSearch={onSearch} />
      </div>
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        ☰
      </button>
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
        <li style={{ position: "relative" }}>
          <Link to="/espace-jambon">Espace Jambon
          <img
            src="/Jambon/JambonLogo.png"
            alt="Logo jambon"
            className="img jambon-hang"
          /></Link>
        </li>
      </ul>
    </nav>
    </>
  );
};

export default Navbar;

