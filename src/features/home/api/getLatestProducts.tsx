import { QueryClientConfig, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../services/AxiosService";
import { ProductDetails } from "../../../types";

export const getLatestProducts = async () => {
  return axiosInstance.get<ProductDetails[]>(`/api/products/latest`).then((response) => response.data);
};

type UseLatestProductsProps = {
  config?: QueryClientConfig;
};

export const useLatestProducts = ({ config }: UseLatestProductsProps) => {
  return useQuery({
    ...config,
    queryKey: ["latest-products"],
    queryFn: () => getLatestProducts(),
    staleTime: 60 * 60 * 1000,
  });
};
