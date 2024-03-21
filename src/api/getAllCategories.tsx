import { QueryClientConfig, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../services/AxiosService";
import { GenericCategory } from "../types";

export const getAllCategories = async () => {
  return axiosInstance.get<GenericCategory[]>(`/categories/all`).then((response) => response.data);
};

type UseCategoriesProps = {
  config?: QueryClientConfig;
};

export const useAllCategories = ({ config }: UseCategoriesProps) => {
  const { data, isLoading, error } = useQuery({
    ...config,
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
    staleTime: 5 * 60 * 1000,
  });

  const categoryList = data ?? [];

  return { categoryList, isLoading, error };
};
