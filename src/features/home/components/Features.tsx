import { faTruck, faMoneyCheck, faHeadset, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "react-bootstrap";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

const features = [
  <div className="feature-box">
    <FontAwesomeIcon icon={faTruck} size="xl" />
    <h6>Delivery</h6>
    <p>Delivery text</p>
  </div>,
  <div className="feature-box">
    <FontAwesomeIcon icon={faMoneyCheck} size="xl" />
    <h6>Secure payment</h6>
    <p>Payment text</p>
  </div>,
  <div className="feature-box">
    <FontAwesomeIcon icon={faHeadset} size="xl" />
    <h6>24/7 Support</h6>
    <p>Support text</p>
  </div>,

  <div className="feature-box">
    <FontAwesomeIcon icon={faArrowsRotate} size="xl" />
    <h6>Return policy</h6>
    <p>Return text</p>
  </div>,
];

const Features = () => {
  const { width } = useWindowDimensions();

  let itemsPerSlide: number;
  if (width > 992) {
    itemsPerSlide = 4;
  } else if (width > 576) {
    itemsPerSlide = 2;
  } else {
    itemsPerSlide = 1;
  }

  const featuresGrouped = [];
  for (let i = 0; i < features.length; i = i + itemsPerSlide) {
    featuresGrouped.push(features.slice(i, i + itemsPerSlide));
  }

  return (
    <section className="features-section">
      <div className="row features-list">
        <Carousel variant="dark" indicators={false} interval={null} className="col-md-12" controls={false}>
          {featuresGrouped.map((featuresBunch, index) => (
            <Carousel.Item key={index} className="row">
              {featuresBunch.map((feature, index) => (
                <div key={index} style={{ float: "left", width: `${Math.floor(100 / itemsPerSlide)}%` }}>
                  {feature}
                </div>
              ))}
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Features;
