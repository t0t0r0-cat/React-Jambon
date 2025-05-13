import React from 'react';

type SortOption = 'newest' | 'oldest' | 'alphabetical';

interface SortDropdownProps {
  onSortChange: (sortBy: SortOption) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange }) => {
  return (
    <div className="sort-dropdown">
      <select 
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        defaultValue="newest"
      >
        <option value="newest">Plus récent</option>
        <option value="oldest">Plus ancien</option>
        <option value="alphabetical">Ordre alphabétique</option>
      </select>
    </div>
  );
};

export default SortDropdown;
