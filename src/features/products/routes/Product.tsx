import { Navigate, useLoaderData } from "react-router-dom";
import PageBanner from "../../../components/PageBanner";
import { ProductDetails } from "../types";
import { Carousel, Container, Tab, Tabs } from "react-bootstrap";
import { capitalize } from "lodash";
import { BACKEND_URL, CURRENCY_SIGN, MEASURE_SIGN } from "../../../config";
import { DEFAULT_IMAGE } from "../../../utils";

const Product = () => {
  const product = useLoaderData() as ProductDetails;

  if (!product) {
    return <Navigate to={"/products"} />;
  }

  return (
    <>
      <PageBanner pageTitle="" />
      <Container>
        <div className="product-general-details">
          <div className="product-images">
            <Carousel>
              {product.images && product.images.length ? (
                product.images.map((image) => (
                  <Carousel.Item key={image.id}>
                    <img
                      className="product-details-img"
                      src={`${BACKEND_URL}/products/${product.id}/${image.filename}`}
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
              <h2 className="product-title">{capitalize(product.name)}</h2>
              <span style={{ color: product.stock === 0 ? "red" : "green" }} className="product-details-stock">
                {product.stock === 0 ? "Out of stock" : "In stock"}
              </span>
            </div>

            <h3 className="product-price">
              {product.price} {CURRENCY_SIGN}
            </h3>

            <div className="product-specifications">
              <Tabs variant="pills">
                <Tab eventKey="size" title="Size">
                  <div className="size-spec">
                    <span>Width:</span>
                    <span>
                      {product.width} {MEASURE_SIGN}
                    </span>

                    <span>Height:</span>
                    <span>
                      {product.height} {MEASURE_SIGN}
                    </span>

                    <span>Depth:</span>
                    <span>
                      {product.depth} {MEASURE_SIGN}
                    </span>
                  </div>
                </Tab>
                <Tab eventKey="category" title="Categories">
                  <div className="categ-spec">
                    {product.categories.map((category) => (
                      <span key={category.id}>{capitalize(category.name)}</span>
                    ))}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Product;
