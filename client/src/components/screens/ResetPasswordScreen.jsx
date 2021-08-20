import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ResetPasswordScreen({ match }) {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  console.log(match);

  const resetpassHandler = async (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      setPassword("");
      setCPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    const config = { header: { "Content-Type": "application/json" } };
    try {
      const { data } = await axios.put(
        `/api/auth/resetpassword/${match.params.resetToken}`,
        { password },
        config
      );
      setSuccess(data.data);
    } catch (err) {
      setError(err.response.data.error);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <>
      <form onSubmit={resetpassHandler} className="d-flex flex-column w-25">
        <h3>Reset Password</h3>
        {error && <span>{error}</span>}
        {success && <span>{success}</span>}
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
          Change Password
        </button>
        {success && (
          <span>
            Wanna go to login page?<Link to="/login">Login</Link>
          </span>
        )}
      </form>
    </>
  );
}

export default ResetPasswordScreen;
