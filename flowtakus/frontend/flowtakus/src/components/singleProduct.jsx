import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function Singleproduct({ token, setToken }) {
  console.log("Loaded!");
  const params = useParams();
  const productId = params.productId;

  const [singleProduct, setSingleProduct] = useState(null);

  useEffect(() => {
    async function fetchSingleProduct() {
      console.log("downloading product");
      try {
        const response = await fetch(
          `https://localhost/ecommerce_flowtakus/api/products/${productId}`
        );
        console.log(response);
        const result = await response.json();
        console.log("download: ", result);
        setSingleProduct(result.product);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSingleProduct();
  }, [productId]);

  async function checkoutProduct(productId) {
    try {
      const response = await fetch(
        `https://localhost/ecommerce_flowtakus/api/products/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            available: false,
          }),
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  console.log("Single product is: ", singleProduct);
  return (
    <div>
      {singleProduct && (
        <ul>
          <li className ="producttitle">{singleProduct.title}</li>
          <li className ="productauthor">{singleProduct.author}</li>
          <li className ="description">{singleProduct.description}</li>
          <li>
            <img src={singleProduct.coverimage} alt={singleProduct.title} />
          </li>
          <li>{singleProduct.available}</li>
          <button
            onClick={async () => {
              await checkoutProduct(productId);
            }}
          >
            Checkout
          </button>
        </ul>
      )}
    </div>
  );
}

export default Singleproduct;
