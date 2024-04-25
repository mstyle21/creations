import { axiosInstance } from "../../services/AxiosService";
import { useQuery } from "@tanstack/react-query";
import { ApiPaginatedResponse, CustomQueryConfig, PackageDetails } from "../../types";

export const getPackages = async ({ filters }: { filters: {} }) => {
  return axiosInstance.get<ApiPaginatedResponse<PackageDetails>>("/packages/", { params: filters }).then((response) => response.data);
};

type UsePackagesProps = {
  filters: {};
  config?: CustomQueryConfig;
};

export const useGetPackages = ({ config, filters }: UsePackagesProps) => {
  const {
    data,
    error,
    isLoading: loading,
    refetch: refreshData,
  } = useQuery({
    ...config,
    queryKey: ["packages-filtered", ...Object.values(filters)],
    queryFn: () => getPackages({ filters }),
  });

  const packages = data?.items ?? [];
  const count = data?.count ?? 0;
  const pages = data?.pages ?? 1;

  return { packages, count, pages, error, loading, refreshData };
};
