import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Products({ token }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://localhost/ecommerce_flowtakus/api/products",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setProducts(data.Products);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  const handleProductsClick = (productsId) => {
    navigate(`/products/${productsId}`);
  };

  return (
    <>
      <div className="Products-container">
        {products &&
          products.map((products) => {
            return (
              <div key={products.id} className="products-container">
                <p className="products-title">{products.title}</p>
                <img
                  className="products-cover"
                  src={products.coverimage}
                  alt={products.title}
                />
                <p className="products-author">{products.author}</p>
                <p>{products.available}</p>
                <button onClick={() => handleProductsClick(products.id)}>
                  View Info
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Products;
