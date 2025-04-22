import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../styles/SearchBar.css'; // Import CSS for styling
import '../styles/App.css'; // Import CSS for styling

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query); // Call the onSearch function with the query
    navigate('/'); // Navigate to the homepage
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Rechercher des articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Rechercher</button>
    </form>
  );
};

export default SearchBar;
