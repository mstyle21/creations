import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/AxiosService";

export const deletePackageImage = async (data: { imageId: string; packageId: string }) => {
  return axiosInstance.delete(`/packages/${data.packageId}/image/${data.imageId}`);
};

export const useDeletePackageImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePackageImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
};
