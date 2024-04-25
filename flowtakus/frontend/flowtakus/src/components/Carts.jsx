import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API = "http://localhost:4000/api";

function Carts({ token, setToken }) {
  console.log("Loaded!");
  const params = useParams();
  const productId = params.productId;

  const [carts, setCarts] = useState(null);

  useEffect(() => {
    async function fetchCarts() {
      try {
        const params = useParams();
        const user_id = params.user_id;
        console.log("downloading items for user_id:", user_id);

        const response = await fetch(`${API}/carts/${user_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);
        const result = await response.json();
        console.log("download: ", result);
        setCarts(result);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCarts();
  }, []);

  async function addToCart(user_id) {
    try {
      const response = await fetch(`${API}/carts/${user_id}`, {
        method: "DELETE",
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

  console.log("carts is: ", carts);
  return (
    <div>
      <h2>Carts</h2>
      {carts && (
        <ul>
          <li className="producttitle">{carts.name}</li>
          <li className="productprice">{carts.price}</li>
          <li className="description">{carts.description}</li>
          <li>
            <img src={carts.images} alt={carts.images} />
          </li>
          <li>{carts.available}</li>
          <button
            onClick={async () => {
              await addToCart(carts_id);
            }}
          >
            Delete Cart
          </button>
        </ul>
      )}
    </div>
  );
}

export default Carts;
