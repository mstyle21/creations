import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/AxiosService";
import { ProductFilters, ApiPaginatedResponse, ProductDetails, CustomQueryConfig } from "../../types";

export const getProductsAndPackages = async (filters: ProductFilters) => {
  return axiosInstance
    .get<ApiPaginatedResponse<ProductDetails & { type: "package" | "product" }>>("/products/figurine", {
      params: filters,
    })
    .then((response) => response.data);
};

type UseProductsProps = {
  filters: ProductFilters;
  config?: CustomQueryConfig;
};

export const useGetProductsAndPackages = ({ filters, config }: UseProductsProps) => {
  const { data } = useQuery({
    ...config,
    queryKey: ["products", ...Object.values(filters)],
    queryFn: () => getProductsAndPackages(filters),
    staleTime: 5 * 60 * 1000,
  });

  const products = data?.items ?? [];
  const count = data?.count ?? 0;
  const pages = data?.pages ?? 0;

  return { products, count, pages };
};
