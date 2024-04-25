import { axiosInstance } from "../../services/AxiosService";
import { useQuery } from "@tanstack/react-query";
import { ApiPaginatedResponse, CustomQueryConfig, ProductDetails } from "../../types";

type Filters = {};
export const getProducts = async ({ filters }: { filters: Filters }) => {
  return axiosInstance.get<ApiPaginatedResponse<ProductDetails>>("/products/", { params: filters }).then((response) => response.data);
};

type UseProductsProps = {
  filters: Filters;
  config?: CustomQueryConfig;
};

export const useGetProducts = ({ config, filters }: UseProductsProps) => {
  const {
    data,
    error,
    isFetching: loading,
    refetch: refreshData,
  } = useQuery({
    queryKey: ["products-filtered", ...Object.values(filters)],
    queryFn: () => getProducts({ filters }),
    ...config,
  });

  const products = data?.items ?? [];
  const count = data?.count ?? 0;
  const pages = data?.pages ?? 1;

  return { products, count, pages, error, loading, refreshData };
};
