import { useSearchParams } from "react-router-dom";
import { PER_PAGE_OPTIONS, SORT_BY_OPTIONS } from "../utils";
import { AVAILABILITY_KEY, CATEGORIES_KEY, TYPE_KEY } from "../components/ProductFilters";

export const useFilterParams = () => {
  const [queryParams] = useSearchParams();

  const page = Math.min(Math.max(1, parseInt(queryParams.get("page") ?? "1")), 90);

  const queryPerPage = parseInt(queryParams.get("perPage") ?? "15");

  const perPage = PER_PAGE_OPTIONS.includes(queryPerPage) ? queryPerPage : 15;

  const queryOrderBy = queryParams.get("order") ?? "";

  const orderBy = SORT_BY_OPTIONS[queryOrderBy] !== undefined ? queryOrderBy : undefined;

  const categories = queryParams
    .get(CATEGORIES_KEY)
    ?.split(",")
    .filter((item) => !isNaN(parseInt(item)));

  const availabilityQuery = queryParams.get(AVAILABILITY_KEY);
  const availability = availabilityQuery && ["yes", "no"].includes(availabilityQuery) ? availabilityQuery : undefined;

  const typeQuery = queryParams.get(TYPE_KEY);
  const type = typeQuery && ["product", "package"].includes(typeQuery) ? typeQuery : undefined;

  return { page, perPage, orderBy, categories, availability, type };
};
