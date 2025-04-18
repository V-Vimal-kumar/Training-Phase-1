import React, { useState } from 'react';
import useDebounce from './useDebounce';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); 

  React.useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('Fetching API results for:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <h2>Debounced Search</h2>
      <input
        type="text"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p>Searching for: {debouncedSearchTerm}</p>
    </div>
  );
};

export default SearchInput;
