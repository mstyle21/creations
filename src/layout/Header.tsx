import { useContext, useEffect, useRef } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";
import { routesConfig } from "../routes";

type HeaderProps = {
  menuItems: { path: string; name: string }[];
};

const Header = ({ menuItems }: HeaderProps) => {
  const { user, logout } = useContext(AuthContext);
  const headerRef = useRef<HTMLBodyElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 40) {
          headerRef.current.classList.add("sticky");
        } else {
          headerRef.current.classList.remove("sticky");
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={headerRef}>
      <div className="main-menu">
        <Navbar expand="lg" className="main-box" collapseOnSelect>
          <Container>
            <Link to={routesConfig.home} className="header-logo">
              <img src={logo} />
              <h2>Pamy's creations</h2>
            </Link>
            <Navbar.Toggle aria-controls="main-menu-nav" />
            <Navbar.Collapse id="main-menu-nav">
              <Nav className="nav ms-auto">
                {menuItems.map((item) => {
                  return (
                    <Nav.Item key={item.path} className={location.pathname === item.path ? "active" : ""}>
                      <Nav.Link as={Link} to={item.path} className="nav-link" eventKey={item.path}>
                        {item.name}
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
                {user ? (
                  <Nav.Item>
                    <Nav.Link
                      as={Link}
                      className="nav-link"
                      to={routesConfig.home}
                      onClick={() => logout()}
                      eventKey={"/logout"}
                    >
                      Log out
                    </Nav.Link>
                  </Nav.Item>
                ) : null
                // <Nav.Item>
                //   <Nav.Link as={Link} className="nav-link" to={routesConfig.login} eventKey={"/login"}>
                //     Log in
                //   </Nav.Link>
                // </Nav.Item>
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
