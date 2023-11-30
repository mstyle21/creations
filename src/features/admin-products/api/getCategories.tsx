import { QueryClientConfig, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../services/AxiosService";
import { ProductCategory } from "../../../types";

export const getCategories = async () => {
  return axiosInstance.get<ProductCategory[]>(`/api/categories/all`).then((response) => response.data);
};

type UseCategoriesProps = {
  config?: QueryClientConfig;
};

export const useCategories = ({ config }: UseCategoriesProps) => {
  const { data, isLoading, error } = useQuery({
    ...config,
    queryKey: ["categories-filter"],
    queryFn: () => getCategories(),
    staleTime: 5 * 60 * 1000,
  });

  const categoryList = data ?? [];

  return { categoryList, isLoading, error };
};
