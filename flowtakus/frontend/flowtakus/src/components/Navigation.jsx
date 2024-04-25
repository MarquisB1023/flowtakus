import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import tokyoicon from "../assets/tokyoicon.png";
// import Login from "./Login";
// import Register from "./Register";
// import Account from "./Account";
// import Home from "./Home";

function Navigation({ token, setToken }) {
  return (
    <div id="nav-container">
      <div className="Storefront-navbar">
        <h1 className="logotitle">
          <a href="/" className="FlowTakusLink">FlowTakus</a> <img className="icon" src={tokyoicon} alt="tokyoicon"></img>
        </h1>
        {/* <h2 class="subheader">Customize anime wear for shoes!</h2> */}
      
      <nav>
        <Link to="/">Home</Link>
        <Link to="/Carts">Carts</Link>
        <Link to="/Account">Account</Link>
        <Link to="/Login">Login</Link>
        <Link to="/Register">Register</Link>
      </nav>
      </div>
    </div>
  );
}

export default Navigation;
