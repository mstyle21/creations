import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "../../../services/AxiosService";
import { ApiPaginatedResponse, ProductDetails } from "../../../types";
import { useProductContext } from "../hooks/useProductContext";

export const useProducts = () => {
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

  return { products: state.products };
};
