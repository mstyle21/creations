import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/AxiosService";
import { ApiPaginatedResponse, CategoryDetails, CustomQueryConfig } from "../../types";

export const getOrders = async ({ filters }: { filters: string }) => {
  return axiosInstance.get<ApiPaginatedResponse<CategoryDetails>>(`/orders?${filters}`).then((response) => response.data);
};

type UseGetOrdersProps = {
  filters: string;
  config?: CustomQueryConfig;
};

export const useGetOrders = ({ filters, config }: UseGetOrdersProps) => {
  const {
    data,
    error,
    isLoading,
    refetch: refreshData,
  } = useQuery({
    queryKey: ["orders", "filtered-orders", filters],
    queryFn: () => getOrders({ filters }),
    ...config,
  });

  const orders = data?.items ?? [];
  const count = data?.count ?? 0;
  const pages = data?.pages ?? 1;

  return { orders, count, pages, error, isLoading, refreshData };
};
