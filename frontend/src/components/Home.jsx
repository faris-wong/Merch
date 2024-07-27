import React, { useContext } from "react";
import UserContext from "../context/user";

const Home = () => {
  const userCtx = useContext(UserContext);

  return <div>Welome {userCtx.username}</div>;
};

export default Home;
