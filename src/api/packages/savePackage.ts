import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/AxiosService";

export const savePackage = async (data: FormData) => {
  const id = data.get("id");
  return axiosInstance.request({
    method: id ? "PUT" : "POST",
    url: id ? `/packages/${id}` : "/packages",
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useSavePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: savePackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
};
