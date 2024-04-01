import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/AxiosService";
import { CustomQueryConfig, ProductDetails } from "../../types";

export const getAllProducts = async () => {
  return axiosInstance.get<ProductDetails[]>(`/products/all`).then((response) => response.data);
};

export const useGetAllProducts = ({ config }: { config?: CustomQueryConfig }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
    ...config,
  });

  const productList = data ?? [];

  return { productList, isLoading, error };
};
