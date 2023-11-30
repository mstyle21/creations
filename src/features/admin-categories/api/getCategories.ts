import { QueryClientConfig, useQuery } from "@tanstack/react-query";
import { ApiPaginatedResponse, CategoryDetails } from "../../../types";
import { axiosInstance } from "../../../services/AxiosService";

export const getCategories = async ({ filters }: { filters: string }) => {
  return axiosInstance
    .get<ApiPaginatedResponse<CategoryDetails>>(`/api/categories?${filters}`)
    .then((response) => response.data);
};

type UseCategoriesProps = {
  filters: string;
  config?: QueryClientConfig;
};

export const useCategories = ({ filters, config }: UseCategoriesProps) => {
  const {
    data,
    error,
    isLoading,
    refetch: refreshData,
  } = useQuery({
    ...config,
    queryKey: ["categories", filters],
    queryFn: () => getCategories({ filters }),
    staleTime: 5 * 60 * 1000,
  });

  const categories = data?.items ?? [];
  const count = data?.count ?? 0;
  const pages = data?.pages ?? 1;

  return { categories, count, pages, error, isLoading, refreshData };
};
