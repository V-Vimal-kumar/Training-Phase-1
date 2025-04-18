import React from "react";
import PropTypes from "prop-types";

function HelloGreet(props) {
  return (
    <div>
      <h2>Hellooo,{props.name}</h2>
    </div>
  );
}

HelloGreet.propTypes = {  
  name: PropTypes.string.isRequired, 
}
export default HelloGreet;
