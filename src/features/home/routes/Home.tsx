import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faHeadset, faMoneyCheck, faTruck } from "@fortawesome/free-solid-svg-icons";
import ItemBox from "../../../components/ItemBox";

const BannerSection = () => {
  return (
    <section className="banner-area">
      <div className="container">
        <div className="row align-items-center justify-content-start">
          <div className="col-lg-12">
            <div className="banner-slider">
              <div className="row slider-item single-slide">
                <div className="col-lg-6 d-flex align-items-center">
                  <div className="banner-content">
                    <h1>Figurine noi</h1>
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, unde voluptatem itaque
                      fuga, tempora odit atque sequi saepe quos nemo animi facilis aperiam aspernatur natus nostrum,
                      libero rerum deleniti ducimus.
                    </p>
                    <Link to={"/"}>Vezi figurine</Link>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="banner-img" style={{ height: "400px" }}>
                    <img src="" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <Container>
        <div className="row features-list">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="feature-box">
              <FontAwesomeIcon icon={faTruck} size="xl" />
              <h6>Delivery</h6>
              <p>Delivery text</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="feature-box">
              <FontAwesomeIcon icon={faMoneyCheck} size="xl" />
              <h6>Secure payment</h6>
              <p>Payment text</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="feature-box">
              <FontAwesomeIcon icon={faHeadset} size="xl" />
              <h6>24/7 Support</h6>
              <p>Support text</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="feature-box">
              <FontAwesomeIcon icon={faArrowsRotate} size="xl" />
              <h6>Return policy</h6>
              <p>Return text</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

const LatestProducts = () => {
  return (
    <section className="latest-products">
      <Container>
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center mb-5">
            <h1>Latest products</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde voluptatibus sint, perspiciatis ducimus,
              labore sit maxime
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <ItemBox id={1} title="Produs 1" price={100} />
          </div>
          <div className="col-lg-3 col-md-6">
            <ItemBox id={2} title="Produs 2" price={45} />
          </div>
          <div className="col-lg-3 col-md-6">
            <ItemBox id={3} title="Produs 3" price={10} />
          </div>
          <div className="col-lg-3 col-md-6">
            <ItemBox id={4} title="Produs 4" price={129.9} />
          </div>
        </div>
      </Container>
    </section>
  );
};

const Home = () => {
  return (
    <>
      <BannerSection />
      <FeaturesSection />
      <LatestProducts />
    </>
  );
};

export default Home;
