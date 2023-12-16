import ItemBox from "../../../components/ItemBox";
import { useProducts } from "../api/getProducts";
import { useEffect } from "react";
import { useFilterParams } from "../../../hooks/useFilterParams";

type ListProps = {
  setPages: (pages: number) => void;
};

const List = ({ setPages }: ListProps) => {
  const { page, perPage, orderBy, categories, availability } = useFilterParams();

  const { products, pages } = useProducts({
    page,
    perPage,
    orderBy,
    categories,
    availability,
  });

  useEffect(() => setPages(pages), [pages, setPages]);

  return (
    <div className="item-list">
      {products.map((item, index) => (
        <ItemBox
          key={index}
          id={item.id}
          title={item.name}
          price={item.price}
          oldPrice={item.oldPrice}
          slug={item.slug}
          type={item.type}
          stock={item.stock}
          img={item.images.at(0)?.filename}
        />
      ))}
    </div>
  );
};

export default List;
