import { LoaderFunctionArgs } from "react-router-dom";
import { getPackage } from "../api/getPackage";

export async function packageDetailsLoader({ params }: LoaderFunctionArgs) {
  if (!params.packageSlug) {
    return null;
  }
  const response = getPackage(params.packageSlug);

  return response;
}
