import { faTruck, faMoneyCheck, faHeadset, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Features = () => {
  return (
    <section className="features-section">
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
    </section>
  );
};

export default Features;
