import { useSearchParams } from "react-router-dom";
import ItemBox from "../../../components/ItemBox";
import { useProducts } from "../api/getProducts";
import { useEffect } from "react";
import { PER_PAGE_OPTIONS, SORT_BY_OPTIONS } from "../../../utils";

type ListProps = {
  setPages: (pages: number) => void;
};

const List = ({ setPages }: ListProps) => {
  const [queryParams] = useSearchParams();
  const page = Math.min(Math.max(1, parseInt(queryParams.get("page") ?? "1")), 90);
  const queryPerPage = parseInt(queryParams.get("perPage") ?? "15");
  const perPage = PER_PAGE_OPTIONS.includes(queryPerPage) ? queryPerPage : 15;
  const queryOrderBy = queryParams.get("order") ?? "";
  const orderBy = SORT_BY_OPTIONS[queryOrderBy] !== undefined ? queryOrderBy : undefined;
  const categories = queryParams
    .get("categories")
    ?.split(",")
    .filter((item) => !isNaN(parseInt(item)));

  const { products, pages } = useProducts({
    page,
    perPage,
    orderBy,
    categories,
  });

  useEffect(() => {
    setPages(pages);
  }, [pages, setPages]);

  return (
    <div className="item-list">
      {products.map((item) => (
        <ItemBox
          key={item.id}
          id={item.id}
          title={item.name}
          price={item.price / 100}
          oldPrice={item.oldPrice / 100}
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
