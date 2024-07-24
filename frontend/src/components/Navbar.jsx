import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./css/Navbar.module.css";

const Navbar = () => {
  return (
    <>
      <header className={styles.navbar}>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/buy">Buy</NavLink>
            </li>
            <li>
              <NavLink to="/sell">Sell</NavLink>
            </li>
            <li>
              <NavLink to="/credits">Credits</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
