import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
const Home = React.lazy(() => import("./components/Home"));
const Profile = React.lazy(() => import("./components/Profile"));
const Buy = React.lazy(() => import("./components/Buy"));
const Sell = React.lazy(() => import("./components/Sell"));
const Credits = React.lazy(() => import("./components/Credits"));
const Login = React.lazy(() => import("./components/Login"));

function App() {
  return (
    <>
      <Navbar></Navbar>

      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/Profile" element={<Profile></Profile>}></Route>
          <Route path="/Buy" element={<Buy></Buy>}></Route>
          <Route path="/Sell" element={<Sell></Sell>}></Route>
          <Route path="/Credits" element={<Credits></Credits>}></Route>
          <Route path="/Login" element={<Login></Login>}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
