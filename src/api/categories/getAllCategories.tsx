import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/AxiosService";
import { CustomQueryConfig, GenericCategory } from "../../types";

export const getAllCategories = async () => {
  return axiosInstance.get<GenericCategory[]>(`/categories/all`).then((response) => response.data);
};

export const useGetAllCategories = ({ config }: { config?: CustomQueryConfig }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
    ...config,
  });

  const categoryList = data ?? [];

  return { categoryList, isLoading, error };
};
