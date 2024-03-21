import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../services/AxiosService";

type CategoryDetails = {
  id?: number;
  name: string;
  status: "active" | "inactive";
};

export const saveCategory = async (data: CategoryDetails) => {
  return axiosInstance.request({
    method: data.id ? "PUT" : "POST",
    url: data.id ? `/categories${data.id}` : "/categories",
    data: data,
  });
};

export const useSaveCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
