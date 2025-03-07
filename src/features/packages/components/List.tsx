import { useEffect } from "react";
import { useFilterParams } from "../../../hooks/useFilterParams";
import ItemBox from "../../../components/ItemBox";
import { useGetPackages } from "../../../api/packages/getPackages";

type ListProps = {
  setPages: (pages: number) => void;
};

const List = ({ setPages }: ListProps) => {
  const { page, perPage, orderBy, categories, availability } = useFilterParams();

  const filters = { page, perPage, orderBy, categories, availability };
  const { packages, pages } = useGetPackages({ filters });

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
