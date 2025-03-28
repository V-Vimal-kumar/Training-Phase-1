import React from "react";
import PropTypes from "prop-types";

function UserDetails({ name, age }) {
  return (
    <div>
      <h2>Name: {name}</h2>
      <h2>Age: {age}</h2>
    </div>
  );
}

UserDetails.propTypes = {
  name: PropTypes.string.isRequired,  
  age: PropTypes.number.isRequired,   
};

export default UserDetails;
