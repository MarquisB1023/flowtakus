import React from "react";
// import Navigation from "./Navigation";
// import Account from "./Account";
// import Login from "./Login";
// import SinglProduct from "./SinglProduct";
import Products from "./Products";
// import Register from "./Register";
// import bookLogo from "../assets/Products.png";

function Home() {
  return (
    <>
    
      <h1>
        {/* <img id="logo-image" src={bookLogo} alt="Library App Logo" /> */}
        FlowTakus
      </h1>
      <p>Customize anime wear for shoes!</p>

      {/* <Account token={token} setFunction={setToken} />
      
      <Login token={token} setFunction={setToken} /> */}
      <Products />
    
    </>
  );
}

export default Home;
