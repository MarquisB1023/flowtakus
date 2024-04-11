import { useState } from "react";
import { Navigate } from "react-router-dom";

function Register({ setToken }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://localhost/3000/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
          }),
        }
      );
      const result = await response.json();
      const token = result.token;
      setToken(token);
      setLoggedIn(true);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="regcontainer">
        <h2>Register for a New Account</h2>
        <form onSubmit={handleSubmit}>
          <h2>First Name</h2>
          {error && <p>{error}</p>}
          <label>
            First:
            <input
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          <h2>Last Name</h2>
          <label>
            Last:
            <input
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          <h2>Email</h2>
          <label>
            Email:
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <h2>Password</h2>
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}

export default Register;
