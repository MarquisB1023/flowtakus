import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
const API = "https://localhost:4000/api"

function Account({ token ,setToken}) {
  console.log("account", token);
  
  const [accounts, setAccounts] = useState(null);
  const [error, setError] = useState();
  async function downloadUser() {
    try {
      const response = await fetch(
        `${API}/users/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setAccounts(result);
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteCarts(cartId) {
    try {
      const response = await fetch(
        `${API}carts/${cartId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  useEffect(() => {
    downloadUser();
  }, []);

  return (
    <>
      {!token && <Navigate to="/" replace={true} />}
      {error && <p>{error}</p>}
      {accounts && (
        <div>
          <ul>
            <li> Name: {accounts.name}</li>
            <li>Email: {accounts.email}</li>
            <li>
              Products:
              <ul>
                {accounts.Products.map((product) => {
                  return (
                    <div>
                      <li key={product.id}>{product.title}</li>

                      <button
                        onClick={async () => {
                          await deleteCarts(product.id);
                          downloadUser();
                        }}
                      >
                        Return product
                      </button>
                    
                    </div>
                  );
                })}
              </ul>
            </li>
          </ul>
          <button token={token} onClick={handleLogout}>
                        logoout
                      </button>
        </div>
      )}
    </>
  );
}

export default Account;
