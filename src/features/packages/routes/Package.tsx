import { Navigate, useLoaderData } from "react-router-dom";
import { PackageDetails } from "../../../types";
import PageBanner from "../../../components/PageBanner";
import { Carousel, Container } from "react-bootstrap";
import { capitalize } from "lodash";
import { BACKEND_URL, CURRENCY_SIGN } from "../../../config";
import { DEFAULT_IMAGE } from "../../../utils";
import PackageItemBox from "../../../components/PackageItemBox";

const Package = () => {
  const packageDetails = useLoaderData() as PackageDetails;

  if (!packageDetails) {
    return <Navigate to={"/packages"} />;
  }

  return (
    <>
      <PageBanner pageTitle="" />
      <Container>
        <div className="product-general-details">
          <div className="product-images">
            <Carousel>
              {packageDetails.images && packageDetails.images.length ? (
                packageDetails.images.map((image) => (
                  <Carousel.Item key={image.id}>
                    <img
                      className="product-details-img"
                      src={`${BACKEND_URL}/packages/${packageDetails.id}/${image.filename}`}
                    />
                  </Carousel.Item>
                ))
              ) : (
                <Carousel.Item>
                  <img className="product-details-img" src={DEFAULT_IMAGE} />
                </Carousel.Item>
              )}
            </Carousel>
          </div>
          <div className="product-details">
            <div>
              <h2 className="product-title">{capitalize(packageDetails.name)}</h2>
              <span style={{ color: packageDetails.stock === 0 ? "red" : "green" }} className="product-details-stock">
                {packageDetails.stock === 0 ? "Out of stock" : "In stock"}
              </span>
            </div>

            <div className="product-price">
              <span>
                {packageDetails.price / 100} {CURRENCY_SIGN}
              </span>
              <span style={{ color: "grey", textDecoration: "line-through" }}>
                {packageDetails.oldPrice / 100} {CURRENCY_SIGN}
              </span>
            </div>

            <div className="product-specifications">
              <span>Category: {packageDetails.category.name}</span>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <h2>Contains:</h2>
          {packageDetails.products.map((item) => (
            <div className="col-md-3" key={item.id}>
              <PackageItemBox
                id={item.id}
                title={item.product.name}
                quantity={item.quantity}
                slug={item.product.slug}
                img={item.product.images[0].filename}
              />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Package;
