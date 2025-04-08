import React from 'react';
import { NavLink } from 'react-router-dom';

const Category = () => {
  const cuisines = ['Italian', 'American', 'Indian', 'Mexican'];

  return (
    <div className="category">
      {cuisines.map(cuisine => (
        <NavLink key={cuisine} to={`/searched/${cuisine.toLowerCase()}`} className="btn">
          {cuisine}
        </NavLink>
      ))}
    </div>
  );
};

export default Category;
