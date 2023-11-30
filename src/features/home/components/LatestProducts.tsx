import { Carousel } from "react-bootstrap";
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
          <h1>Latest products</h1>
        </div>
      </div>
      {data && (
        <div className="row">
          <Carousel>
            {latestProducts.map((latestProductsBunch, index) => (
              <Carousel.Item key={index} className="row">
                {latestProductsBunch.map((product) => (
                  <div key={product.id} className="col-md-3" style={{ float: "left" }}>
                    <ItemBox
                      id={product.id}
                      title={product.name}
                      price={product.price}
                      type="product"
                      slug={product.slug}
                      img={product.images?.at(0)?.filename}
                    />
                  </div>
                ))}
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
    </section>
  );
};

export default LatestProducts;
