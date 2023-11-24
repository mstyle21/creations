import { useEffect } from "react";
import ItemBox from "../../../components/ItemBox";
import { useProductContext } from "../hooks/useProductContext";
import { axiosInstance } from "../../../services/AxiosService";
import { ProductDetails } from "../types";
import { ApiPaginatedResponse } from "../../../types";

const List = () => {
  const { state, dispatch } = useProductContext();

  useEffect(() => {
    const abortController = new AbortController();

    axiosInstance
      .get<ApiPaginatedResponse<ProductDetails>>(`/api/products?page=${state.page}&perPage=${state.perPage}`, {
        signal: abortController.signal,
      })
      .then((response) => {
        dispatch({ type: "setProductList", payload: response.data.items });
        dispatch({ type: "setProductCount", payload: response.data.count });
        dispatch({ type: "setPages", payload: response.data.pages });
      });

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.page, state.perPage]);

  const products = state.products;

  return (
    <div className="item-list">
      {products.map((item) => (
        <ItemBox key={item.id} id={item.id} title={item.name} price={item.price} img={item.images.at(0)?.filename} />
      ))}
    </div>
  );
};

export default List;