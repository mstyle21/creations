import { Carousel, Row } from "react-bootstrap";
import ItemBox from "../../../components/ItemBox";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { useGetLatestProducts } from "../../../api/products/getLatestProducts";

const LatestProducts = () => {
  const { data, isLoading } = useGetLatestProducts({ config: { staleTime: 5 * 60 * 1000 } });
  const { width } = useWindowDimensions();

  const latestProducts = [];
  let itemsPerSlide: number;
  if (width > 992) {
    itemsPerSlide = 4;
  } else if (width > 768) {
    itemsPerSlide = 3;
  } else if (width > 576) {
    itemsPerSlide = 2;
  } else {
    itemsPerSlide = 1;
  }

  if (data) {
    for (let i = 0; i < data.length; i = i + itemsPerSlide) {
      latestProducts.push(data.slice(i, i + itemsPerSlide));
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
                  <div key={index} style={{ float: "left", width: `${Math.floor(100 / itemsPerSlide)}%` }}>
                    <ItemBox
                      id={product.id}
                      title={product.name}
                      price={product.price}
                      type={product.type}
                      slug={product.slug}
                      img={product.images?.at(0)?.filename}
                    />
                  </div>
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
