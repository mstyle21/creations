import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/AxiosService";
import { CustomQueryConfig, PackageDetails } from "../../types";
import { stockColor } from "../../utils";

export const getPackageStockStatistics = async () => {
  return axiosInstance.get<PackageDetails[]>("/packages/stats").then((response) => response.data);
};

export const useGetPackageStockStatistics = ({ config }: { config?: CustomQueryConfig }) => {
  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["packages", "package-stock-stats"],
    queryFn: () => getPackageStockStatistics(),
    ...config,
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
