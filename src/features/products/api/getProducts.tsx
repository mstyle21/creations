import { axiosInstance } from "../../../services/AxiosService";
import { ApiPaginatedResponse, ProductDetails, ProductFilters } from "../../../types";
import { QueryClientConfig, useQuery } from "@tanstack/react-query";
import { GenericAbortSignal } from "axios";

type GetProductsProps = ProductFilters & {
  signal?: GenericAbortSignal;
};

export const getProducts = async ({
  page = 1,
  perPage = 15,
  orderBy,
  categories,
  availability,
  signal,
}: GetProductsProps) => {
  return axiosInstance
    .get<ApiPaginatedResponse<ProductDetails>>("/api/products", {
      signal: signal,
      params: {
        page,
        perPage,
        categories,
        availability,
        orderBy,
      },
    })
    .then((response) => response.data);
};

type UseProductsProps = ProductFilters & {
  config?: QueryClientConfig;
};

export const useProducts = ({
  page = 1,
  perPage = 15,
  orderBy,
  categories,
  availability,
  config,
}: UseProductsProps) => {
  const { data } = useQuery({
    ...config,
    queryKey: ["products", page, perPage, orderBy, categories, availability],
    queryFn: ({ signal }) => getProducts({ page, perPage, orderBy, categories, availability, signal }),
    staleTime: 5 * 60 * 1000,
  });

  const products = data?.items ?? [];
  const count = data?.count ?? 0;
  const pages = data?.pages ?? 0;

  return { products, count, pages };
};
