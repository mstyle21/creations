import { useState } from "react";

export const useFilters = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ by: string; order: "asc" | "desc" }>({ by: "id", order: "desc" });

  const handlePerPageChange = (perPage: number) => {
    setPerPage(perPage);
    setPage(1);
  };

  const handleSearchChange = (search: string) => {
    setSearch(search);
    setPage(1);
  };

  const handleSort = (by: string) => {
    let order: "asc" | "desc" = "asc";

    if (sort.by === by) {
      order = sort.order === "asc" ? "desc" : "asc";
    }

    setSort({ by: by, order: order });
  };

  let filterLink = `page=${page}&perPage=${perPage}`;
  if (search !== "") {
    filterLink += `&search=${search}`;
  }
  filterLink += `&sortBy=${sort.by}&order=${sort.order}`;

  return { page, perPage, search, sort, filterLink, setPage, setPerPage: handlePerPageChange, setSearch: handleSearchChange, handleSort };
};
