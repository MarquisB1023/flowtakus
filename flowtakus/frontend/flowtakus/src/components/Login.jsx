import { useState } from "react";
import { Navigate } from "react-router-dom";

const API = "http://localhost:4000/api";

function Login({ setToken }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: Email,
          password: Password,
        }),
      });
      console.log("response", response);
      const result = await response.json();
      console.log(result, "here");
      const token = result.token;
      setToken(token);
      setLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  }
  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="logincontainer">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <h2>Email</h2>
          {error && <p>{error}</p>}
          <label>
            Email:
            <input
              name="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <h2>Password</h2>
          {error && <p>{error}</p>}
          <label>
            Password:{""}
            <input
              type="password"
              name="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
