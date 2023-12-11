import { QueryClientConfig, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../services/AxiosService";
import { PackageDetails } from "../../../types";

export const getPackage = async (packageSlug: string) => {
  return axiosInstance.get<PackageDetails>(`/api/packages/${packageSlug}`).then((response) => response.data);
};

type UsePackageProps = {
  packageSlug: string;
  config?: QueryClientConfig;
};

export const usePackage = ({ packageSlug, config }: UsePackageProps) => {
  return useQuery({
    queryKey: ["package"],
    queryFn: () => getPackage(packageSlug),
    staleTime: 5 * 60 * 1000,
    ...config,
  });
};
