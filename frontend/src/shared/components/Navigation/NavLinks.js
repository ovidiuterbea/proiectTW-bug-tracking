import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;

  return (
    <div className='main-navigation'>
      <h3>Bug tracking </h3>
      <ul className='nav-links'>
        {auth.isLoggedIn && (
          <li>
            <NavLink activeClassName='activeLink' to={`/${userId}/myBugs`}>
              MY BUGS
            </NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink activeClassName='activeLink' to={`/${userId}/projects`}>
              MY PROJECTS
            </NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink activeClassName='activeLink' to='/projects' exact>
              ALL PROJECTS
            </NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink activeClassName='activeLink' to='/projects/new'>
              NEW PROJECT
            </NavLink>
          </li>
        )}

        {!auth.isLoggedIn && (
          <li>
            <NavLink to='/'>AUTHENTICATE</NavLink>
          </li>
        )}

        {auth.isLoggedIn && (
          <li>
            <NavLink onClick={auth.logout} to='/'>
              LOGOUT
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavLinks;
