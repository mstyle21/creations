import { GenericAbortSignal } from "axios";
import { axiosInstance } from "../../../services/AxiosService";
import { ApiPaginatedResponse, PackageDetails, ProductFilters } from "../../../types";
import { QueryClientConfig, useQuery } from "@tanstack/react-query";

type GetPackagesProps = ProductFilters & {
  signal?: GenericAbortSignal;
};

export const getPackages = async ({ page = 1, perPage = 15, orderBy, categories, signal }: GetPackagesProps) => {
  return axiosInstance
    .get<ApiPaginatedResponse<PackageDetails>>("/api/packages", {
      signal: signal,
      params: {
        page,
        perPage,
        categories,
        orderBy,
      },
    })
    .then((response) => response.data);
};

type UsePackagesProps = ProductFilters & {
  config?: QueryClientConfig;
};

export const usePackages = ({ page = 1, perPage = 15, orderBy, categories, config }: UsePackagesProps) => {
  const { data } = useQuery({
    ...config,
    queryKey: ["packages", page, perPage, orderBy, categories],
    queryFn: ({ signal }) => getPackages({ page, perPage, orderBy, categories, signal }),
    staleTime: 5 * 60 * 1000,
  });

  const packages = data?.items ?? [];
  const count = data?.count ?? 0;
  const pages = data?.pages ?? 0;

  return { packages, count, pages };
};
