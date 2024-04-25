import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/AxiosService";
import { ApiPaginatedResponse, CategoryDetails, CustomQueryConfig } from "../../types";

export const getCategories = async ({ filters }: { filters: {} }) => {
  return axiosInstance.get<ApiPaginatedResponse<CategoryDetails>>("/categories/", { params: filters }).then((response) => response.data);
};

type UseCategoriesProps = {
  filters: {};
  config?: CustomQueryConfig;
};

export const useGetCategories = ({ filters, config }: UseCategoriesProps) => {
  const {
    data,
    error,
    isLoading,
    refetch: refreshData,
  } = useQuery({
    queryKey: ["categories", "filtered-categories", ...Object.values(filters)],
    queryFn: () => getCategories({ filters }),
    ...config,
  });

  const categories = data?.items ?? [];
  const count = data?.count ?? 0;
  const pages = data?.pages ?? 1;

  return { categories, count, pages, error, isLoading, refreshData };
};
