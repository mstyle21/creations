import { Carousel, Col, Row } from "react-bootstrap";
import ItemBox from "../../../components/ItemBox";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useLatestProducts } from "../api/getLatestProducts";

const LatestProducts = () => {
  const { data, isLoading } = useLatestProducts({});

  const latestProducts = [];
  if (data) {
    for (let i = 0; i < data.length; i = i + 4) {
      latestProducts.push(data.slice(i, i + 4));
    }
  }

  return (
    <section className="latest-products">
      {isLoading && <LoadingSpinner />}

      <div className="row justify-content-center">
        <div className="col-lg-6 text-center">
          <h1>Ultimele produse</h1>
        </div>
      </div>
      {data && (
        <Row>
          <Carousel variant="dark" indicators={false} className="col-md-12">
            {latestProducts.map((latestProductsBunch, index) => (
              <Carousel.Item key={index} className="row">
                {latestProductsBunch.map((product, index) => (
                  <Col key={index} lg={3} md={4} sm={1} style={{ float: "left" }}>
                    <ItemBox
                      id={product.id}
                      title={product.name}
                      price={product.price}
                      type={product.type}
                      slug={product.slug}
                      img={product.images?.at(0)?.filename}
                    />
                  </Col>
                ))}
              </Carousel.Item>
            ))}
          </Carousel>
        </Row>
      )}
    </section>
  );
};

export default LatestProducts;
