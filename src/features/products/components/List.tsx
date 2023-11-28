import { useEffect } from "react";
import ItemBox from "../../../components/ItemBox";
import { useProductContext } from "../hooks/useProductContext";
import { axiosInstance } from "../../../services/AxiosService";
import { ProductDetails } from "../types";
import { ApiPaginatedResponse } from "../../../types";
import { useSearchParams } from "react-router-dom";

const List = () => {
  const { state, dispatch } = useProductContext();
  const [queryParams] = useSearchParams();

  useEffect(() => {
    const abortController = new AbortController();

    axiosInstance
      .get<ApiPaginatedResponse<ProductDetails>>("/api/products", {
        signal: abortController.signal,
        params: {
          page: queryParams.get("page") ?? 1,
          perPage: queryParams.get("perPage") ?? 15,
          categories: queryParams.get("categories")?.split(","),
          orderBy: queryParams.get("order"),
        },
      })
      .then((response) => {
        dispatch({ type: "setProductList", payload: response.data.items });
        dispatch({ type: "setProductCount", payload: response.data.count });
        dispatch({ type: "setPages", payload: response.data.pages });
      })
      .catch(() => {});

    return () => abortController.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams.get("categories"), queryParams.get("page"), queryParams.get("perPage"), queryParams.get("order")]);

  return (
    <div className="item-list">
      {state.products.map((item) => (
        <ItemBox
          key={item.id}
          id={item.id}
          title={item.name}
          price={item.price}
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
