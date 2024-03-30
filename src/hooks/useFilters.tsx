import { useState } from "react";

type SORTER = {
  by: string;
  order: "asc" | "desc";
};
type USER_PREFS = {
  [page: string]: {
    perPage: number;
    sort: SORTER;
  };
};

const USER_PREFS_KEY = import.meta.env.VITE_USER_PREFS;
const defaultSort: SORTER = { by: "id", order: "desc" };

export const useFilters = () => {
  const userPrefs = getUserPrefs();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(userPrefs ? userPrefs.perPage : 10);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SORTER>(userPrefs ? userPrefs.sort : defaultSort);

  const handlePerPageChange = (perPage: number) => {
    setPerPage(perPage);
    setPage(1);
    saveUserPrefs("perPage", perPage);
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

    const sorter: SORTER = { by: by, order: order };
    setSort(sorter);
    saveUserPrefs("sort", sorter);
  };

  let filterLink = `page=${page}&perPage=${perPage}`;
  if (search !== "") {
    filterLink += `&search=${search}`;
  }
  filterLink += `&sortBy=${sort.by}&order=${sort.order}`;

  return { page, perPage, search, sort, filterLink, setPage, setPerPage: handlePerPageChange, setSearch: handleSearchChange, handleSort };
};

const getUserPrefs = () => {
  const userPrefs = localStorage.getItem(USER_PREFS_KEY);

  if (null === userPrefs) {
    return null;
  }

  const userPrefsDecoded: USER_PREFS = JSON.parse(userPrefs);
  const currentPage: string = window.location.pathname.replace("/", "");

  if (userPrefsDecoded[currentPage]) {
    return userPrefsDecoded[currentPage];
  }

  return null;
};

const saveUserPrefs = (type: "perPage" | "sort", value: number | SORTER) => {
  const userPrefsStored = localStorage.getItem(USER_PREFS_KEY);
  const currentPage: string = window.location.pathname.replace("/", "");

  const pageDefaultPrefs = {
    perPage: 10,
    sort: defaultSort,
  };

  let userPrefs: USER_PREFS;

  if (userPrefsStored === null) {
    userPrefs = {
      [currentPage]: pageDefaultPrefs,
    };
  } else {
    userPrefs = JSON.parse(userPrefsStored);

    if (!userPrefs[currentPage]) {
      userPrefs[currentPage] = pageDefaultPrefs;
    }
  }

  userPrefs[currentPage] = {
    ...userPrefs[currentPage],
    [type]: value,
  };

  localStorage.setItem(USER_PREFS_KEY, JSON.stringify(userPrefs));
};
