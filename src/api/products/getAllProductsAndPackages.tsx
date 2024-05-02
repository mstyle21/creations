import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/AxiosService";
import { ProductDetails, CustomQueryConfig } from "../../types";

type ApiResult = ProductDetails & { type: "package" | "product" };

export const getAllProductsAndPackages = async () => {
  return axiosInstance.get<ApiResult[]>("/products/allProductsAndPackages").then((response) => response.data);
};

type UseProductsProps = {
  config?: CustomQueryConfig;
};

export const useGetAllProductsAndPackages = ({ config }: UseProductsProps) => {
  const { data } = useQuery({
    ...config,
    queryKey: ["products", "packages"],
    queryFn: () => getAllProductsAndPackages(),
  });

  const products = data ?? [];

  return { products };
};
