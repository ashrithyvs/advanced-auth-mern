import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

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
        "https://adv-auth-mern.herokuapp.com/api/auth/login",
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
    <Container className="w-25 mx-auto my-5">
      <h2 className="text-center mb-4">Login</h2>
      {error && <span>{error}</span>}
      <Form onSubmit={loginHandler}>
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <div className="mt-3">
          <p className="text-muted">
            Don't have an account?<Link to="/register"> Register</Link>
          </p>
          <p className="text-muted">
            Forgot Password?<Link to="/forgotpassword"> Click here!</Link>
          </p>
        </div>
      </Form>
    </Container>
  );
}

export default LoginScreen;
