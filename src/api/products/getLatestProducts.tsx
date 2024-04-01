import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/AxiosService";
import { CustomQueryConfig, ProductDetails } from "../../types";

export const getLatestProducts = async () => {
  return axiosInstance.get<(ProductDetails & { type: "product" | "package" })[]>(`/products/latest`).then((response) => response.data);
};

export const useGetLatestProducts = ({ config }: { config?: CustomQueryConfig }) => {
  return useQuery({
    queryKey: ["latest-products"],
    queryFn: () => getLatestProducts(),
    ...config,
  });
};
