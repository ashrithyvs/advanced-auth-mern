import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ForgotPasswordScreen({ history }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const forgotpassHandler = async (e) => {
    e.preventDefault();

    const config = { header: { "Content-Type": "application/json" } };
    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );
      setSuccess(data.data);
    } catch (err) {
      setError(err.response.data.error);
      setEmail("");
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <>
      <form onSubmit={forgotpassHandler} className="d-flex flex-column w-25">
        <h3>Login</h3>
        {error && <span>{error}</span>}
        {success && <span>{success}</span>}
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
        <button type="submit" className="btn btn-primary">
          Send Email
        </button>
        {success && (
          <span>
            Got your password?<Link to="/login">Login</Link>
          </span>
        )}
      </form>
    </>
  );
}

export default ForgotPasswordScreen;
