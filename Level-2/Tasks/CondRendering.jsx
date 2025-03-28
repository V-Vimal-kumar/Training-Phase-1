import React from "react";
import PropTypes from "prop-types";

function CondRend({ isLoggedIn }) {
  return <h2>{isLoggedIn ? "Welcome back!" : "Please log in"}</h2>;
}

CondRend.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired, 
};

export default CondRend;
