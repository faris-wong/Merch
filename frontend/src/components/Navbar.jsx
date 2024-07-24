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
              <NavLink to="/Home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/Profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/Buy">Buy</NavLink>
            </li>
            <li>
              <NavLink to="/Sell">Sell</NavLink>
            </li>
            <li>
              <NavLink to="/Credits">Credits</NavLink>
            </li>
            <li>
              <NavLink to="/Login">Login</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
