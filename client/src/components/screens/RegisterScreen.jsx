import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RegisterScreen({ history }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = { header: { "Content-Type": "application/json" } };

    if (password !== cpassword) {
      setPassword("");
      setCPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        { username, email, password },
        config
      );
      console.log(data);
      localStorage.setItem("authToken", data.token);
      history.push("/");
    } catch (err) {
      setError(err.response.data.error);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div>
      <form onSubmit={registerHandler} className="d-flex flex-column w-25">
        <h3>Register</h3>
        {error && <span>{error}</span>}
        <input
          required
          id="name"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          required
          id="email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          required
          id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          required
          id="cpassword"
          type="password"
          placeholder="Confirm password"
          value={cpassword}
          onChange={(e) => {
            setCPassword(e.target.value);
          }}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <span>
          Already have an account?<Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}

export default RegisterScreen;
