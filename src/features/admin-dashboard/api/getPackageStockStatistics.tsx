import { QueryClientConfig, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../services/AxiosService";
import { PackageDetails } from "../../../types";
import { stockColor } from "../../../utils";

export const getPackageStockStatistics = async () => {
  return axiosInstance.get<PackageDetails[]>("/packages/stats").then((response) => response.data);
};

type UsePackageStockStatisticsProps = {
  config?: QueryClientConfig;
};

export const usePackageStockStatistics = ({ config }: UsePackageStockStatisticsProps) => {
  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    ...config,
    queryKey: ["packages", "package-stock-stats"],
    queryFn: () => getPackageStockStatistics(),
    staleTime: 5 * 60 * 1000,
  });

  const labels: (string | string[])[] = [];
  const values: number[] = [];
  const colors: string[] = [];

  if (data) {
    data.forEach((product) => {
      labels.push(product.name.length < 30 ? product.name : product.name.split(" "));
      values.push(product.stock);
      colors.push(stockColor(product.stock));
    });
  }

  return { labels, values, colors, loading, error };
};
