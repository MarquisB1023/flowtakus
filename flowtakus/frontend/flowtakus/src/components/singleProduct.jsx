import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API = "http://localhost:4000/api";

function SingleProduct({ token }) {
  console.log("Loaded!");
  const { product_id } = useParams();

  const [singleProduct, setSingleProduct] = useState(null);

  useEffect(() => {
    async function fetchSingleProduct() {
      console.log("downloading product");
      try {
        const response = await fetch(`${API}/products/${product_id}`);
        console.log(response);
        const result = await response.json();
        console.log("download: ", result);
        setSingleProduct(result);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSingleProduct();
  }, [product_id, token]);

  async function checkoutProduct(user_id) {
    try {
      const response = await fetch(`${API}/carts/${user_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          available: false,
        }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  console.log("Single product is: ", singleProduct);
  return (
    <div className="product-box">
      <h1> Product </h1>
      {singleProduct && (
        <div>
        <ul >
          <li>
            <img
              src={`http://localhost:4000/${singleProduct.images}`}
              alt={singleProduct.images}
            />
          </li>
          <li className="producttitle">{singleProduct.name}</li>
          <li className="productauthor">Artist:{singleProduct.artist}</li>
          <li className="price">${singleProduct.price}</li>
          <li className="description">{singleProduct.description}</li>

          <li>{singleProduct.available}</li>
          <button
            onClick={async () => {
              await checkoutProduct(product_id);
            }}
          >
            Checkout
          </button>
        </ul>
        </div>
      )}
    </div>
  );
}

export default SingleProduct;
