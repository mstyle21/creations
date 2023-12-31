import { useSearchParams } from "react-router-dom";
import Paginator from "./Paginator";
import SortList from "./SortList";
import PerPageFilter from "./filters/PerPage";
import { PER_PAGE_OPTIONS, SORT_BY_OPTIONS } from "../utils";

type ActionToolbarProps = {
  pages: number;
};

const ActionToolbar = ({ pages }: ActionToolbarProps) => {
  const [queryParams, setQueryParams] = useSearchParams();

  const handleSortBy = (sortBy: string) => {
    queryParams.set("order", sortBy);
    setQueryParams(queryParams);
    handlePageChange(1);
  };

  const handlePerPageChange = (perPage: number) => {
    queryParams.set("perPage", perPage.toString());
    setQueryParams(queryParams);
    handlePageChange(1);
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
        sortByList={SORT_BY_OPTIONS}
        onSortByChange={handleSortBy}
      />
      <div className="toolbar-paginator">
        <PerPageFilter
          defaultValue={queryParams.get("perPage") ?? "10"}
          perPageOptions={PER_PAGE_OPTIONS}
          onChange={handlePerPageChange}
        />
        <Paginator page={page} pages={pages} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ActionToolbar;
