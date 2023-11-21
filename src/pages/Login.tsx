import { Col, Container, Row } from "react-bootstrap";
import PageBanner from "../components/PageBanner";
import { Link, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BACKEND_URL } from "../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isDisabled = !(email && password && password.length >= 6);
  const { user, loginRedirect, login } = useContext(AuthContext);

  if (user) {
    const defaultRedirect = user.role === "admin" ? "/dashboard" : "/";
    return <Navigate to={loginRedirect ?? defaultRedirect} replace />;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await fetch(`${BACKEND_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then(async (response) => {
          const resp = await response.json();

          if (response.ok) {
            return resp;
          } else {
            throw new Error(resp.message);
          }
        })
        .then((data) => {
          login(data.token);
        })
        .catch((error: Error) => {
          setError(error.message);
        });
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  return (
    <>
      <PageBanner pageTitle="Login" />
      <section className="login-box">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="login-form">
                <h3 className="text-center">Log in</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form className="row" onSubmit={handleSubmit}>
                  <Col md={12} className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email..."
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                  <Col md={12} className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password..."
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                  <Col md={12} className="form-group forgot-password">
                    <Link to={"/forgot-password"}>Forgot password?</Link>
                  </Col>
                  <Col md={12} className="form-group action-btn">
                    <button className="primary-btn" disabled={isDisabled}>
                      LOG IN
                    </button>
                    <Link to={"/register"}>New? Create an account</Link>
                  </Col>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Login;
