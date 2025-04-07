import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import the Font Awesome search icon

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    const sanitizedQuery = query.replace(/[^a-zA-Z0-9 ]/g, ''); // Sanitize input
    if (!sanitizedQuery.trim()) return; // Prevent empty queries

    const currentPath = window.location.pathname;

    if (currentPath !== '/') {
      // Open a new tab with the sanitized search results
      const searchUrl = `/?search=${encodeURIComponent(sanitizedQuery)}`;
      window.open(searchUrl, '_blank');
    } else {
      // Trigger the search on the current page
      onSearch(sanitizedQuery);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(); // Trigger search when Enter is pressed
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Add keydown event listener
        placeholder="Tout trouver"
      />
      <button onClick={handleSearch} aria-label="Search">
        <FaSearch /> {/* Magnifying glass icon */}
      </button>
    </div>
  );
};

export default SearchBar;
