import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

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
    <Container className="w-50 mx-auto my-5">
      <h2 className="text-center mb-4">Forgot Password</h2>
      <Form onSubmit={forgotpassHandler}>
        {error && <span>{error}</span>}
        {success && <span>{success}</span>}
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Button type="submit">Send Email</Button>
        {success && (
          <p className="text-muted">
            Got your password?<Link to="/login">Login</Link>
          </p>
        )}
      </Form>
    </Container>
  );
}

export default ForgotPasswordScreen;
