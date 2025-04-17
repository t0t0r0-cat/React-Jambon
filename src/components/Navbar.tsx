// Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './Navbar.css'; // Import the CSS file

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
       <a href="/" className="brand">Éco de l'île</a>
      <div className="navbar-search-bar-container">
        <SearchBar onSearch={onSearch} />
      </div>
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        ☰ {/* Mobile menu icon */}
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
          <Link to="/espace-jambon">Espace Jambon</Link> {/* Add Espace Jambon link */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

