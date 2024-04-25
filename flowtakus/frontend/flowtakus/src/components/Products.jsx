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

//   const handleProductsClick = async (product_id, user_id) => {
//     try {
//       const response = await fetch(`${API}/carts/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           body: JSON.stringify({
//             user_id: user_id,
//             product_id: product_id,
//           }),
//         },
//       });
//       if (response.ok) {
//         navigate(`/products/${product_id}`);
//       } else {
//         console.error("Failed to add product to cart");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

  const handleProductsClick = async (product_id) => {
   
        navigate(`/products/${product_id}`);

  };
  return (
    <>
      <div className="Products-container">
        {products &&
          products.map((product) => {
            return (
              <div key={product.id} className="products-container">
                 <img
                  className="products-cover"
                  src={`http://localhost:4000/${product.images[0]}`}
                  alt={product.images[0]}
                />
                <p className="products-title">{product.name}</p>
               
                <p className="products-prices">${product.price}</p>
                <p>{product.available}</p>
                {/* <button onClick={() => handleProductsClick(product.id)}> */}
                <button onClick={() => handleProductsClick(product.id)}>
                  View Product
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Products;
