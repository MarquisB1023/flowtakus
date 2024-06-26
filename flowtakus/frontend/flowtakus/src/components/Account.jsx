import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API = "http://localhost:4000/api";

function Account({ token, setToken }) {
  console.log("account", token);

  const [account, setAccount] = useState(null);
  const [error, setError] = useState();
  async function downloadUser() {
    try {
      const response = await fetch(`${API}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const result = await response.json();
      console.log(result);
      setAccount(result);
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteCarts(userId) {
    try {
      const response = await fetch(`${API}/api/carts/${user_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    Navigate("/");
  };

  useEffect(() => {
    downloadUser();
    console.log(token, "here");
  }, []);

  return (
    <>
      {!token && <Navigate to="/" replace={true} />}
      {error && <p>{error}</p>}
      {account && (
        <div>
            <div className="account">
            <h2 >Account</h2>
            </div>
          <ul>
            <li>Name: {account.name}</li>
            <li>Email: {account.email}</li>
            <li>
              {/* Carts:
              <ul>
                {account.Carts.map((cart) => {
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
              </ul> */}
            </li>
          </ul>
          <div className="logout">
          <button  token={token} onClick={handleLogout}>
            logoout
          </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Account;
