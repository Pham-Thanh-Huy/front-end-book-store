import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const Login: React.FC = () => {
  // State for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to backend)
    const loginRequest = {
      username: username,
      password: password,
    };
    try {
      const response = await fetch("http://localhost:8888/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginRequest),
      });
      if (response.ok) {
        setError("");
        setSuccess("Đăng nhập thành công");
        const data = await response.json();
        const { jwt } = data;
        localStorage.setItem("token", jwt);
      } else {
        setSuccess("");
        const { error } = await response.json();
        setError(error);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
              <div>
                <p style={{ color: "red" }}>{error}</p>
              </div>
              <div>
                <p style={{ color: "green" }}>{success}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
