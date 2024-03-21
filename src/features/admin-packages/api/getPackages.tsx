import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../../../services/AxiosService";
import { useQuery } from "@tanstack/react-query";
import { ApiPaginatedResponse, PackageDetails } from "../../../types";

export const getPackages = async ({ filters }: { filters: string }) => {
  return axiosInstance.get<ApiPaginatedResponse<PackageDetails>>(`/packages?${filters}`).then((response) => response.data);
};

type UsePackagesProps = {
  filters: string;
  config?: AxiosRequestConfig;
};

export const usePackages = ({ config, filters }: UsePackagesProps) => {
  const {
    data,
    error,
    isLoading: loading,
    refetch: refreshData,
  } = useQuery({
    ...config,
    queryKey: ["packages-filtered", filters],
    queryFn: () => getPackages({ filters }),
    staleTime: 5 * 60 * 1000,
  });

  const packages = data?.items ?? [];
  const count = data?.count ?? 0;
  const pages = data?.pages ?? 1;

  return { packages, count, pages, error, loading, refreshData };
};
