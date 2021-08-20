import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
function PrivateScreen({ history }) {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      console.log(config);
      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };
    fetchPrivateData();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return (
    <Container className="mx-auto w-50 my-5">
      {error && <span>{error}</span>}
      <div>
        <h3>{privateData}</h3>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </Container>
  );
}

export default PrivateScreen;
