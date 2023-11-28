import ItemBox from "../../../components/ItemBox";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxios from "../../../hooks/useAxios";
import { ProductDetails } from "../../../types";

const LatestProducts = () => {
  const { data, loading } = useAxios<ProductDetails[]>({
    url: "/api/products/latest",
    method: "get",
  });

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
          {data.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-6">
              <ItemBox
                id={product.id}
                title={product.name}
                price={product.price}
                img={product.images?.at(0)?.filename}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestProducts;
