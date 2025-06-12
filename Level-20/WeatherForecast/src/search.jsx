import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoAPI } from './api';

function Search({ onSearchChange }) {  
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoAPI
      );
      const data = await response.json();

      return {
        options: data.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`, 
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { options: [] };
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData); 
  };

  return (
    <AsyncPaginate
      placeholder="Enter your city..."
      onChange={handleOnChange}
      value={search}
      debounceTimeout={600}
      loadOptions={loadOptions}
    />
  );
}

export default Search;
