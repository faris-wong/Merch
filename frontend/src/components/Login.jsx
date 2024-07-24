import React, { useState } from "react";
import styles from "./css/Login.module.css";
import Register from "./Register";

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);

  const toggleShowRegister = () => {
    setShowRegister(!showRegister);
    // if (showRegister === true) {
    //   setShowRegister(false);
    // } else {
    //   setShowRegister(true);
    // }
  };

  return (
    <>
      <div className={styles.login}>
        <div className="row">
          <div className="col-md-3">
            Email <input></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            Password <input></input>
          </div>
        </div>
        <button>Login</button>
        <button onClick={() => setShowRegister(true)}>Register</button>
        {showRegister && (
          <Register setShowRegister={setShowRegister}></Register>
        )}
      </div>
    </>
  );
};

export default Login;
