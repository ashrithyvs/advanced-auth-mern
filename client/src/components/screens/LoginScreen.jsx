import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LoginScreen({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = { header: { "Content-Type": "application/json" } };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );
      localStorage.setItem("authToken", data.token);
      history.push("/");
    } catch (err) {
      setError(err.response.data.error);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div>
      <form onSubmit={loginHandler} className="d-flex flex-column w-25">
        <h3>Login</h3>
        {error && <span>{error}</span>}

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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <span>
          Don't have an account?<Link to="/register">Register</Link>
        </span>
        <span>
          Forgot Password?<Link to="/forgotpassword">Click here!</Link>
        </span>
      </form>
    </div>
  );
}

export default LoginScreen;
