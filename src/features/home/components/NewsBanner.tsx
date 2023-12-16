import { Link } from "react-router-dom";
import fig from "../../../assets/figurine.png";
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
                <Col md={6} className="d-flex align-items-center">
                  <div className="banner-content">
                    <h1>Figurine noi</h1>
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, unde voluptatem itaque
                      fuga, tempora odit atque sequi saepe quos nemo animi facilis aperiam aspernatur natus nostrum,
                      libero rerum deleniti ducimus.
                    </p>
                    <Link to={routesConfig.products} className="prim-btn">
                      Vezi figurine
                    </Link>
                  </div>
                </Col>
                <Col md={6}>
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
