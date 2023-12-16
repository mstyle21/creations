import { Navigate, useLoaderData } from "react-router-dom";
import PageBanner from "../../../components/PageBanner";
import { Carousel, Container, Tab, Tabs } from "react-bootstrap";
import { capitalize } from "lodash";
import { BACKEND_URL, CURRENCY_SIGN, MEASURE_SIGN } from "../../../config";
import { DEFAULT_IMAGE } from "../../../utils";
import { ProductDetails } from "../../../types";
import { routesConfig } from "../../../routes";

const Product = () => {
  const product = useLoaderData() as ProductDetails;

  if (!product) {
    return <Navigate to={routesConfig.products} />;
  }

  return (
    <>
      <PageBanner pageTitle="" />
      <Container>
        <div className="product-general-details">
          <div className="product-images">
            <Carousel variant="dark" indicators={false} controls={product.images.length > 1}>
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
                {product.stock === 0 ? "Stoc epuizat" : "In stoc"}
              </span>
            </div>

            <div className="product-price">
              <span>
                {product.price / 100} {CURRENCY_SIGN}
              </span>
              <span style={{ color: "grey", textDecoration: "line-through" }}>
                {product.oldPrice / 100} {CURRENCY_SIGN}
              </span>
            </div>

            <div className="product-specifications">
              <Tabs variant="pills">
                <Tab eventKey="size" title="Dimensiuni">
                  <div className="size-spec">
                    <span>Latime:</span>
                    <span>
                      {product.width} {MEASURE_SIGN}
                    </span>

                    <span>Inaltime:</span>
                    <span>
                      {product.height} {MEASURE_SIGN}
                    </span>

                    <span>Adancime:</span>
                    <span>
                      {product.depth} {MEASURE_SIGN}
                    </span>
                  </div>
                </Tab>
                <Tab eventKey="category" title="Categorii">
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
