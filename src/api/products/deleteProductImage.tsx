import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/AxiosService";

export const deleteProductImage = async (data: { imageId: string; productId: string }) => {
  return axiosInstance.delete(`/products/${data.productId}/image/${data.imageId}`);
};

export const useDeleteProductImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
