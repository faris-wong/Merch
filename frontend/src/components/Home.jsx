import React, { useContext } from "react";
import UserContext from "../context/user";
import home from "../assets/home.jpg";

const Home = () => {
  const userCtx = useContext(UserContext);

  return (
    <>
      <div>Welcome {userCtx.username}</div>
      <div></div>
      <img src={home} style={{ width: "100%", height: "100%" }}></img>
    </>
  );
};

export default Home;
