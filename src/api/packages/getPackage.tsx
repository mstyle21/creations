import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/AxiosService";
import { CustomQueryConfig, PackageDetails } from "../../types";

export const getPackage = async (packageSlug: string) => {
  return axiosInstance.get<PackageDetails>(`/packages/${packageSlug}`).then((response) => response.data);
};

type UsePackageProps = {
  packageSlug: string;
  config?: CustomQueryConfig;
};

export const usePackage = ({ packageSlug, config }: UsePackageProps) => {
  return useQuery({
    queryKey: ["package"],
    queryFn: () => getPackage(packageSlug),
    ...config,
  });
};
