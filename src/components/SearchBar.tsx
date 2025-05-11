import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchBar.css';
import '../styles/App.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    navigate('/');
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
