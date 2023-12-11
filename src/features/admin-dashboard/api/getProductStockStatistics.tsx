import { QueryClientConfig, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../services/AxiosService";
import { ProductDetails } from "../../../types";
import { stockColor } from "../../../utils";

const getProductStockStatistics = async () => {
  return axiosInstance.get<ProductDetails[]>("api/products/stats").then((response) => response.data);
};

type UseProductStockStatistics = {
  config?: QueryClientConfig;
};

export const useProductStockStatistics = ({ config }: UseProductStockStatistics) => {
  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    ...config,
    queryKey: ["products", "product-stock-stats"],
    queryFn: () => getProductStockStatistics(),
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
