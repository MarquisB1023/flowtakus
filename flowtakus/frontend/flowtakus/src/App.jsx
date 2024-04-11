import { useState, useEffect } from "react";

import "./index.css";
import Home from "./components/Home";
// import bookLogo from "./assets/Products.png";
import Account from "./components/Account";
import Products from "./components/Products";
import Login from "./components/Login.jsx";
import Navigation from "./components/Navigation";
import Register from "./components/Register.jsx";
import Cart from "./components/Cart.jsx";
import singleProduct from "./components/singleProduct";
import { Routes, Route } from "react-router-dom";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token")||null);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);


  return (
    <>
      <div id="navbar">
        <Navigation token={token} setToken={setToken} />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Login"
          element={<Login token={token} setToken={setToken} />}
        />
        <Route path="/Products" element={<Products />} />
        <Route
          path="/Products/:productId"
          element={<singleProduct token={token} setToken={setToken} />}
        />
        <Route
          path="/Register"
          element={<Register token={token} setToken={setToken} />}
        />

<Route
          path="/Cart"
          element={<Cart token={token} setToken={setToken} />}
        />
        <Route
          path="/Account"
          element={<Account token={token} setToken={setToken} />}
        />
      </Routes>
    </>
  );
}

export default App;
