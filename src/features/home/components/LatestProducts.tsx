import { Carousel } from "react-bootstrap";
import ItemBox from "../../../components/ItemBox";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxios from "../../../hooks/useAxios";
import { ProductDetails } from "../../products/types";

const LatestProducts = () => {
  const { data, loading } = useAxios<ProductDetails[]>({
    url: "/api/products/latest",
    method: "get",
  });

  const latestProducts = [];
  if (data) {
    for (let i = 0; i < data.length; i = i + 4) {
      latestProducts.push(data.slice(i, i + 4));
    }
  }

  return (
    <section className="latest-products">
      {loading && <LoadingSpinner />}

      <div className="row justify-content-center">
        <div className="col-lg-6 text-center mb-5">
          <h1>Latest products</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde voluptatibus sint, perspiciatis ducimus,
            labore sit maxime
          </p>
        </div>
      </div>
      {data && (
        <div className="row">
          <Carousel interval={null}>
            {latestProducts.map((latestProductsBunch, index) => (
              <Carousel.Item key={index} className="row">
                {latestProductsBunch.map((product) => (
                  <div key={product.id} className="col-md-3">
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
