import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Profile() {
  return (
    <div>
      <Outlet />

      <ul>
        <li>
          <NavLink to="about">About</NavLink>
        </li>
        <li>
          <NavLink to="comments">Comments</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Profile;
