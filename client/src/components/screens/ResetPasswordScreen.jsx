import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

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
    <Container className="w-25 mx-auto my-5">
      <Form onSubmit={resetpassHandler}>
        <h3>Reset Password</h3>
        {error && <span>{error}</span>}
        {success && <span>{success}</span>}

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            id="cpassword"
            type="password"
            placeholder="Confirm password"
            value={cpassword}
            onChange={(e) => {
              setCPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button type="submit" className="btn btn-primary">
          Change Password
        </Button>
        {success && (
          <p className="mt-3 text-muted">
            Wanna go to login page?<Link to="/login">Login</Link>
          </p>
        )}
      </Form>
    </Container>
  );
}

export default ResetPasswordScreen;
