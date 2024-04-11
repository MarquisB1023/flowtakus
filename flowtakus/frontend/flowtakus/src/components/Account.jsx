import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function Account({ token ,setToken}) {
  console.log("account", token);
  
  const [accounts, setAccounts] = useState(null);
  const [error, setError] = useState();
  async function downloadUser() {
    try {
      const response = await fetch(
        "https://localhost3000/api/users/me",
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
        `https://localhost3000/api/carts/${cartId}`,
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
            <li>First Name: {accounts.firstname}</li>
            <li>Last Name: {accounts.lastname}</li>
            <li>Email: {accounts.email}</li>
            <li>
              Carts:
              <ul>
                {accounts.Carts.map((cart) => {
                  return (
                    <div>
                      <li key={cart.id}>{cart.title}</li>

                      <button
                        onClick={async () => {
                          await deleteCarts(cart.id);
                          downloadUser();
                        }}
                      >
                        Return cart
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
