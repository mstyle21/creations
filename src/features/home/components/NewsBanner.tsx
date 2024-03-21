import { Link } from "react-router-dom";
// import fig from "../../../assets/figurine.png";
import fig from "../../../assets/tablou.png";
import { routesConfig } from "../../../routes";
import { Col, Row } from "react-bootstrap";

const NewsBanner = () => {
  return (
    <section className="banner-area">
      <div className="container">
        <Row className="align-items-center justify-content-start">
          <Col sm={12}>
            <div className="banner-slider">
              <div className="row slider-item single-slide">
                <Col sm={6} className="d-flex align-items-center justify-content-center">
                  <div className="banner-content">
                    <h1>Figurine noi</h1>
                    <p>
                      Figurine noi de primavara si Paste in stoc!
                    </p>
                    <Link to={routesConfig.products} className="prim-btn">
                      Vezi figurine
                    </Link>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="banner-img">
                    <img src={fig} alt="" />
                  </div>
                </Col>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default NewsBanner;
