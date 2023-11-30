import ItemBox from "../../../components/ItemBox";
import { useProducts } from "../api/getProducts";

const List = () => {
  const { products } = useProducts();

  return (
    <div className="item-list">
      {products.map((item) => (
        <ItemBox
          key={item.id}
          id={item.id}
          title={item.name}
          price={item.price}
          oldPrice={item.oldPrice}
          slug={item.slug}
          type="product"
          stock={item.stock}
          img={item.images.at(0)?.filename}
        />
      ))}
    </div>
  );
};

export default List;
