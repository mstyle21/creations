import Paginator from "../../../components/Paginator";
import SortList from "../../../components/SortList";
import PerPageFilter from "../../../components/filters/PerPage";
import { useProductContext } from "../hooks/useProductContext";

const sortByList = {
  name: "Name",
  priceAsc: "Price asc",
  priceDesc: "Price desc",
};

const perPageOptions = [2, 5, 10, 20, 50, 100];

const ActionToolbar = () => {
  const { state, dispatch } = useProductContext();

  const handleSortBy = (sortBy: string) => {
    dispatch({ type: "setOrderBy", payload: sortBy });
  };

  const handlePerPageChange = (perPage: number) => {
    dispatch({ type: "setPerPage", payload: perPage });
  };

  const handlePageChange = (page: number) => {
    dispatch({ type: "setPage", payload: page });
  };

  return (
    <div className="action-toolbar">
      <SortList className="toolbar-sort-by" sortByList={sortByList} onSortByChange={handleSortBy} />
      <div className="toolbar-paginator">
        <PerPageFilter perPageOptions={perPageOptions} onChange={handlePerPageChange} />
        <Paginator page={state.page} pages={state.pages} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ActionToolbar;
