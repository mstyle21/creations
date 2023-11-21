import { useState } from "react";

export const useFilters = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");

  let filterLink = `page=${page}&perPage=${perPage}`;
  if (search !== "") {
    filterLink += `&search=${search}`;
  }

  return { page, perPage, search, filterLink, setPage, setPerPage, setSearch };
};
