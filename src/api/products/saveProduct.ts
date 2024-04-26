import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/AxiosService";

export const saveProduct = async (data: FormData) => {
  const id = data.get("id");
  return axiosInstance.request({
    method: id ? "PUT" : "POST",
    url: id ? `/products/${id}` : "/products",
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useSaveProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
