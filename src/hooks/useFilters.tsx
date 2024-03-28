import { useState } from "react";

export const useFilters = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ by: "id", order: "desc" });

  let filterLink = `page=${page}&perPage=${perPage}`;
  if (search !== "") {
    filterLink += `&search=${search}`;
  }
  filterLink += `&sortBy=${sort.by}&order=${sort.order}`;

  return { page, perPage, search, sort, filterLink, setPage, setPerPage, setSearch, setSort };
};
