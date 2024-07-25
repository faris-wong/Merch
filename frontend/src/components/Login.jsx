import React, { useState, useEffect, useContext } from "react";
import styles from "./css/Login.module.css";
import Register from "./Register";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useFetchNT from "../hooks/useFetchNT";

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);
  const usingFetchNT = useFetchNT();
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleShowRegister = () => {
    setShowRegister(!showRegister);
  };

  const { isError, error, data, refetch } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      try {
        return await usingFetchNT("/login", "POST", { email, password });
      } catch (error) {
        throw error.message;
      }
    },
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      userCtx.setAccessToken(data.access);
      const decoded = jwtDecode(data.access);
      userCtx.setUUID(decoded.uuid);
      userCtx.setRole(decoded.role);
      navigate("/"); // change to be able to access login page even after logged in
    }
  }, [data]);
  console.log(data);
  return (
    <>
      <div className={styles.login}>
        <div className="row">
          <div className="col-md-3">
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
        </div>
        <button onClick={refetch}>Login</button>
        <button onClick={() => setShowRegister(true)}>Register</button>
        {showRegister && (
          <Register setShowRegister={setShowRegister}></Register>
        )}
      </div>
    </>
  );
};

export default Login;
