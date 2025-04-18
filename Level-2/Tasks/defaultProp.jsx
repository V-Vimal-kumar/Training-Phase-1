import React from "react";
import PropTypes from "prop-types";

function Greeting(props) {
  return <h2>{props.message || "Hello, World!"}</h2>;
}

Greeting.propTypes = {
  message: PropTypes.string,
};

export default Greeting;
