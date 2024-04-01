import { LoaderFunctionArgs } from "react-router-dom";
import { getPackage } from "../../../api/packages/getPackage";

export async function packageDetailsLoader({ params }: LoaderFunctionArgs) {
  if (!params.packageSlug) {
    return null;
  }
  const response = getPackage(params.packageSlug);

  return response;
}
