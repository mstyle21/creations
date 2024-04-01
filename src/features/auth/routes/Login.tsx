import { Col, Container, Row } from "react-bootstrap";
import PageBanner from "../../../components/PageBanner";
import { Link, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { requestToken } from "../../../api/auth/login";
import { routesConfig } from "../../../routes";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isDisabled = !(email && password && password.length >= 6);
  const { user, loginRedirect, login } = useContext(AuthContext);

  if (user) {
    const defaultRedirect = user.role === "admin" ? routesConfig.dashboard : routesConfig.home;
    return <Navigate to={loginRedirect ?? defaultRedirect} replace />;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { token, error } = await requestToken({ email, password });

    if (error) {
      setError(error);
      return false;
    }

    login(token);
  };

  return (
    <>
      <PageBanner pageTitle="Autentificare" />
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
                      placeholder="Parola..."
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                  <Col md={12} className="form-group forgot-password">
                    <Link to={routesConfig.forgotPassword}>Ai uitat parola?</Link>
                  </Col>
                  <Col md={12} className="form-group action-btn">
                    <button className="primary-btn prim-btn" disabled={isDisabled}>
                      Autentificare
                    </button>
                    <Link to={routesConfig.register}>Nou pe site? Inregistreaza-te.</Link>
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
