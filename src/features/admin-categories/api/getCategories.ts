import { QueryClientConfig, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../services/AxiosService";

export const getCategories = ({ filters }: { filters: string }) => {
  return axiosInstance.get(`/api/categories?${filters}`);
};

type UseCategoriesProps = {
  filters: string;
  config?: QueryClientConfig;
};

export const useCategories = ({ filters, config }: UseCategoriesProps) => {
  return useQuery({
    ...config,
    queryKey: ["categories"],
    queryFn: () => getCategories({ filters }),
  });
};
