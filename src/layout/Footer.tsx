import { Link } from "react-router-dom";
import { routesConfig } from "../routes";

const Footer = () => {
  return (
    <footer className="mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer-box">
              <h6>Item 1</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae iure nisi labore a voluptate excepturi
                odit harum fugiat, ratione mollitia ipsum sint magni. Doloremque, iusto quod architecto ab nostrum in?
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer-box">
              <h6>Item 2</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae iure nisi labore a voluptate excepturi
                odit harum fugiat, ratione mollitia ipsum sint magni. Doloremque, iusto quod architecto ab nostrum in?
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer-box">
              <h6>Item 3</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae iure nisi labore a voluptate excepturi
                odit harum fugiat, ratione mollitia ipsum sint magni. Doloremque, iusto quod architecto ab nostrum in?
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer-box">
              <h6>Item 4</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae iure nisi labore a voluptate excepturi
                odit harum fugiat, ratione mollitia ipsum sint magni. Doloremque, iusto quod architecto ab nostrum in?
              </p>
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
