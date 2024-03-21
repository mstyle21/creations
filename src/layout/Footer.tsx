import { Link } from "react-router-dom";
import { routesConfig } from "../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

type FooterProps = {
  menuItems: { path: string; name: string }[];
};

const Footer = ({ menuItems }: FooterProps) => {
  return (
    <footer className="mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="footer-box">
              <h6 className="text-center">Pamy's creations</h6>
              <ul className="footer-menu">
                {menuItems.map((item) => {
                  return (
                    <li key={item.path} className={location.pathname === item.path ? "active" : ""}>
                      <Link to={item.path} className="nav-link">
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer-box">
              <h6>Item 2</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae iure nisi labore a voluptate excepturi
                odit harum fugiat, ratione mollitia ipsum sint magni. Doloremque, iusto quod architecto ab nostrum in?
              </p>
            </div>
          </div> */}
          {/* <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer-box">
              <h6>Item 3</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae iure nisi labore a voluptate excepturi
                odit harum fugiat, ratione mollitia ipsum sint magni. Doloremque, iusto quod architecto ab nostrum in?
              </p>
            </div>
          </div> */}
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="footer-box">
              <h6 className="text-center">Figurine de ipsos</h6>
              <div className="footer-social">
                <a href="https://www.facebook.com/profile.php?id=100090237502012">
                  <FontAwesomeIcon icon={faFacebook} size="3x" />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faInstagram} size="3x" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <p className="copyright-text m-0">
            Copyright © {new Date().getFullYear()} <Link to={routesConfig.home}>Pamy's Creations</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
