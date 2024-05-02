import ItemBox from "../../../components/ItemBox";
import { useEffect } from "react";
import { useFilterParams } from "../../../hooks/useFilterParams";
import { useGetProductsAndPackages } from "../../../api/products/getProductsAndPackages";

type ListProps = {
  setPages: (pages: number) => void;
};

const List = ({ setPages }: ListProps) => {
  const { page, perPage, orderBy, categories, availability, type } = useFilterParams();

  const { products, pages } = useGetProductsAndPackages({
    filters: {
      page,
      perPage,
      orderBy,
      categories,
      availability,
      type,
    },
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
