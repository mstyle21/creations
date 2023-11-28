import { useSearchParams } from "react-router-dom";
import Paginator from "../../../components/Paginator";
import SortList from "../../../components/SortList";
import PerPageFilter from "../../../components/filters/PerPage";
import { useProductContext } from "../hooks/useProductContext";

const sortByList = {
  recent: "Most recent",
  name: "Name",
  priceAsc: "Price asc",
  priceDesc: "Price desc",
};

const perPageOptions = [15, 30, 60, 90];

const ActionToolbar = () => {
  const { state } = useProductContext();
  const [queryParams, setQueryParams] = useSearchParams();

  const handleSortBy = (sortBy: string) => {
    queryParams.set("order", sortBy);
    setQueryParams(queryParams);
  };

  const handlePerPageChange = (perPage: number) => {
    queryParams.set("perPage", perPage.toString());
    setQueryParams(queryParams);
  };

  const handlePageChange = (page: number) => {
    queryParams.set("page", page.toString());
    setQueryParams(queryParams);
  };

  const queryPage = queryParams.get("page");
  const page = queryPage !== null ? parseInt(queryPage) : 1;

  return (
    <div className="action-toolbar">
      <SortList
        className="toolbar-sort-by"
        defaultValue={queryParams.get("order") ?? undefined}
        sortByList={sortByList}
        onSortByChange={handleSortBy}
      />
      <div className="toolbar-paginator">
        <PerPageFilter
          defaultValue={queryParams.get("perPage") ?? "10"}
          perPageOptions={perPageOptions}
          onChange={handlePerPageChange}
        />
        <Paginator page={page} pages={state.pages} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ActionToolbar;
