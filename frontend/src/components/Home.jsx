import React, { useContext } from "react";
import UserContext from "../context/user";
import home from "../assets/home.jpg";

const Home = () => {
  const userCtx = useContext(UserContext);

  return (
    <>
      <div>Welome {userCtx.username}</div>
      <div>readME</div>
      <img src={home} style={{ width: "100%", height: "100%" }}></img>
    </>
  );
};

export default Home;
