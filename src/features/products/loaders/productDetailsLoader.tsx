import { LoaderFunctionArgs } from "react-router-dom";
import { axiosInstance } from "../../../services/AxiosService";
import { ProductDetails } from "../../../types";

export async function productDetailsLoader({ params }: LoaderFunctionArgs): Promise<ProductDetails> {
  const { data: product } = await axiosInstance.get<ProductDetails>(`/api/products/${params.productSlug}`);

  return product;
}
