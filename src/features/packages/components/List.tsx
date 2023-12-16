import { useEffect } from "react";
import { useFilterParams } from "../../../hooks/useFilterParams";
import { usePackages } from "../api/getPackages";
import ItemBox from "../../../components/ItemBox";

type ListProps = {
  setPages: (pages: number) => void;
};

const List = ({ setPages }: ListProps) => {
  const { page, perPage, orderBy, categories, availability } = useFilterParams();

  const { packages, pages } = usePackages({
    page,
    perPage,
    orderBy,
    categories,
    availability,
  });

  useEffect(() => setPages(pages), [pages, setPages]);

  return (
    <div className="item-list">
      {packages.map((item) => (
        <ItemBox
          key={item.id}
          id={item.id}
          title={item.name}
          price={item.price}
          oldPrice={item.oldPrice}
          slug={item.slug}
          type="package"
          stock={item.stock}
          img={item.images.at(0)?.filename}
        />
      ))}
    </div>
  );
};

export default List;
