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
    onSearch(query);
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
