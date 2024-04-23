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
      <div className = "Storefront-container" >
      <h1>
        {/* <img id="logo-image" src={bookLogo} alt="Library App Logo" /> */}
        FlowTakus
      </h1>
      <h2>Customize anime wear for shoes!</h2>
      </div>
      {/* <Account token={token} setFunction={setToken} />
      
      <Login token={token} setFunction={setToken} /> */}
      <Products />
    
    </>
  );
}

export default Home;
