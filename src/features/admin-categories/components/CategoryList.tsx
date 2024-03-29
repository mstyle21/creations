import { capitalize } from "lodash";
import { Button } from "react-bootstrap";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Paginator from "../../../components/Paginator";
import PaginatorInfo from "../../../components/PaginatorInfo";
import PerPageFilter from "../../../components/filters/PerPage";
import SearchFilter from "../../../components/filters/Search";
import { useFilters } from "../../../hooks/useFilters";
import { useState } from "react";
import { CategoryDetails } from "../../../types";
import CategoryModal from "./CategoryModal";
import { useCategories } from "../../../api/getCategories";
import { SortableColumn } from "../../../components/SortableColumn";

const perPageOptions = [10, 20, 50, 100];

const CategoryList = () => {
  const { page, perPage, sort, filterLink, setPage, setPerPage, setSearch, handleSort } = useFilters();
  const [showModal, setShowModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<CategoryDetails | null>(null);

  const { categories, count, pages, error, isLoading } = useCategories({ filters: filterLink });

  const handleOpenModal = (itemToEdit = null) => {
    setItemToEdit(itemToEdit);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handlePerPageChange = (perPage: number) => {
    setPerPage(perPage);
    setPage(1);
  };

  return (
    <>
      <div className="admin-table-container">
        {!isLoading && error && <p className="alert alert-danger text-center">Something went wrong!</p>}
        <div className="admin-toolbar">
          <PerPageFilter perPageOptions={perPageOptions} onChange={handlePerPageChange} />
          <SearchFilter onChange={setSearch} />
          <Button className="btn-success" onClick={() => handleOpenModal()}>
            Add new category
          </Button>
        </div>
        <div className="admin-table">
          <div className="table-head">
            <SortableColumn title="Id" value="id" sortOptions={sort} handleSort={handleSort} />
            <SortableColumn title="Name" value="name" sortOptions={sort} handleSort={handleSort} />
            <SortableColumn title="Products" value="products" sortOptions={sort} handleSort={handleSort} />
            <SortableColumn title="Packages" value="packages" sortOptions={sort} handleSort={handleSort} />
            <span>Status</span>
            <span>Actions</span>
          </div>
          <div className="table-body">
            {isLoading && <LoadingSpinner />}
            {!isLoading && !error && categories.length === 0 && <p className="text-center">No categories found!</p>}
            {categories.length > 0 &&
              categories.map((category) => {
                return (
                  <div className="table-row" key={category.id}>
                    <span>{category.id}</span>
                    <span>{category.name}</span>
                    <span>{category.products.length}</span>
                    <span>{category.packages.length}</span>
                    <span style={{ fontWeight: "bold", color: category.status === "active" ? "green" : "red" }}>
                      {capitalize(category.status)}
                    </span>
                    <span>
                      <Button
                        onClick={() => {
                          setShowModal(true);
                          setItemToEdit({ ...category });
                        }}
                      >
                        Edit
                      </Button>
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="admin-pagination">
          <PaginatorInfo perPage={perPage} page={page} count={count} />
          <Paginator page={page} pages={pages} handlePageChange={setPage} />
        </div>
      </div>
      <CategoryModal show={showModal} closeModal={handleCloseModal} itemToEdit={itemToEdit} />
    </>
  );
};

export default CategoryList;
