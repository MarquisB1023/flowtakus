import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API = "http://localhost:4000/api";

function Products({ token }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`${API}/products`);
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  const handleProductsClick = (cartId) => {
    navigate(`/carts/${cartId}`);
  };

  return (
    <>
      <div className="Products-container">
        {products &&
          products.map((product) => {
            return (
              <div key={product.id} className="products-container">
                <p className="products-title">{product.name}</p>
                <img
                  className="products-cover"
                  src={`http://localhost:4000/${product.images[0]}`}
                  alt={product.images[0]}
                />
                <p className="products-prices">${product.price}</p>
                <p>{product.available}</p>
                <button onClick={() => handleProductsClick(product.id)}>
                  Add To Cart
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Products;
