import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./css/Navbar.module.css";
import UserContext from "../context/user";

const Navbar = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    location.reload();
  };
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
              {!userCtx.accessToken && <NavLink to="/login">Login</NavLink>}
            </li>
            <li>
              {userCtx.accessToken && (
                <button onClick={handleLogout}>logout</button>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
