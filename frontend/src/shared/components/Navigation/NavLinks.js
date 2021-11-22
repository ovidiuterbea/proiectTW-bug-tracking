// import React, { useContext } from "react";
import React from "react";
import { NavLink } from "react-router-dom";

// import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  //   const auth = useContext(AuthContext);

  return (
    <div className='main-navigation'>
      <h3>Bug tracking </h3>
      <ul className='nav-links'>
        <li>
          <NavLink to='/u1/projects'>MY PROJECTS</NavLink>
        </li>
        <li>
          <NavLink to='/projects'>ALL PROJECTS</NavLink>
        </li>
        <li>
          <NavLink to='/projects/new'>NEW PROJECT</NavLink>
        </li>

        <li>
          <NavLink to='/'>AUTHENTICATE</NavLink>
        </li>

        {/* <li>
        <button onClick={auth.logout}>LOGOUT</button>
      </li> */}
      </ul>
    </div>
  );
};

export default NavLinks;
