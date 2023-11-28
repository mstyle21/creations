import { Link } from "react-router-dom";
import fig from "../../../assets/figurine.png";

const NewsBanner = () => {
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
                  <div className="banner-img">
                    <img src={fig} alt="" />
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

export default NewsBanner;
