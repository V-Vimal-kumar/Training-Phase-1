import React from "react";
import PropTypes from "prop-types";

function MultiProps(props) {
  return (
    <div>
      <h2>Name: {props.name}</h2>
      <h2>Age: {props.age}</h2>
    </div>
  );
}

UserGreeting.propTypes = {  
  name: PropTypes.string.isRequired, 
  age: PropTypes.number.isRequired,
}
export default MultiProps;
