import { axiosInstance } from "../../services/AxiosService";
import { useQuery } from "@tanstack/react-query";
import { ApiPaginatedResponse, CustomQueryConfig, ProductDetails } from "../../types";

export const getProducts = async ({ filters }: { filters: string }) => {
  return axiosInstance.get<ApiPaginatedResponse<ProductDetails>>(`/products?${filters}`).then((response) => response.data);
};

type UseProductsProps = {
  filters: string;
  config?: CustomQueryConfig;
};

export const useProducts = ({ config, filters }: UseProductsProps) => {
  const {
    data,
    error,
    isLoading: loading,
    refetch: refreshData,
  } = useQuery({
    queryKey: ["products-filtered", filters],
    queryFn: () => getProducts({ filters }),
    ...config,
  });

  const products = data?.items ?? [];
  const count = data?.count ?? 0;
  const pages = data?.pages ?? 1;

  return { products, count, pages, error, loading, refreshData };
};
