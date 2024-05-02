import { axiosInstance } from "../../services/AxiosService";
import { useQuery } from "@tanstack/react-query";
import { ApiPaginatedResponse, CustomQueryConfig, PackageDetails } from "../../types";

//TODO: define filters for packages
type Filters = {};

export const getPackages = async ({ filters }: { filters: Filters }) => {
  return axiosInstance.get<ApiPaginatedResponse<PackageDetails>>("/packages/", { params: filters }).then((response) => response.data);
};

type UsePackagesProps = {
  filters: Filters;
  config?: CustomQueryConfig;
};

export const useGetPackages = ({ config, filters }: UsePackagesProps) => {
  const {
    data,
    error,
    isFetching: loading,
    refetch: refreshData,
  } = useQuery({
    queryKey: ["packages-filtered", ...Object.values(filters)],
    queryFn: () => getPackages({ filters }),
    ...config,
  });

  const packages = data?.items ?? [];
  const count = data?.count ?? 0;
  const pages = data?.pages ?? 1;

  return { packages, count, pages, error, loading, refreshData };
};
