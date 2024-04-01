import { GenericAbortSignal } from "axios";
import { axiosInstance } from "../../../services/AxiosService";
import { ApiPaginatedResponse, PackageDetails, ProductFilters } from "../../../types";
import { QueryClientConfig, useQuery } from "@tanstack/react-query";

type GetPackagesProps = ProductFilters & {
  signal?: GenericAbortSignal;
};

export const getPackages = async ({ page = 1, perPage = 15, orderBy, categories, availability }: GetPackagesProps) => {
  return axiosInstance
    .get<ApiPaginatedResponse<PackageDetails>>("/packages", {
      params: {
        page,
        perPage,
        categories,
        availability,
        orderBy,
      },
    })
    .then((response) => response.data);
};

type UsePackagesProps = ProductFilters & {
  config?: QueryClientConfig;
};

export const useGetPackages = ({ page = 1, perPage = 15, orderBy, categories, availability, config }: UsePackagesProps) => {
  const { data } = useQuery({
    queryKey: ["packages", page, perPage, orderBy, categories, availability],
    queryFn: () => getPackages({ page, perPage, orderBy, categories, availability }),
    ...config,
  });

  const packages = data?.items ?? [];
  const count = data?.count ?? 0;
  const pages = data?.pages ?? 0;

  return { packages, count, pages };
};
