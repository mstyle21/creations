import { QueryClientConfig, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../services/AxiosService";
import { ProductDetails } from "../types";

export const getAllProducts = async () => {
  return axiosInstance.get<ProductDetails[]>(`/products/all`).then((response) => response.data);
};

type UseProductsProps = {
  config?: QueryClientConfig;
};

export const useAllProducts = ({ config }: UseProductsProps) => {
  const { data, isLoading, error } = useQuery({
    ...config,
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
    staleTime: 5 * 60 * 1000,
  });

  const productList = data ?? [];

  return { productList, isLoading, error };
};
