import React from "react";
import { Route, Routes, Link } from "react-router-dom";
// import Login from "./Login";
// import Register from "./Register";
// import Account from "./Account";
// import Home from "./Home";

function Navigation({ token, setToken }) {
  return (

      <div id="container">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/Account">Account</Link>
          <Link to="/Login">Login</Link>
          <Link to= "/Cart">Cart</Link>
          <Link to="/Register">Register</Link>
        </nav>
      </div>
  
  );
}

export default Navigation;
