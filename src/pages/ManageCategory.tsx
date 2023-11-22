import { Button, Container } from "react-bootstrap";
import PageBanner from "../components/PageBanner";
import { capitalize } from "../utils";
import { useState } from "react";
import ManageCategoryModal from "../features/ManageCategoryModal";
import useAxios from "../hooks/useAxios";
import LoadingSpinner from "../components/LoadingSpinner";
import Paginator from "../components/Paginator";
import PaginatorInfo from "../components/PaginatorInfo";
import PerPageFilter from "../components/filters/PerPage";
import { useFilters } from "../hooks/useFilters";
import { ApiPaginatedResponse, CategoryDetails } from "../types";
import SearchFilter from "../components/filters/Search";

const ManageCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<CategoryDetails | null>(null);
  const { page, perPage, filterLink, setPage, setPerPage, setSearch } = useFilters();

  const { data, error, loading, refreshData } = useAxios<ApiPaginatedResponse<CategoryDetails>>({
    url: `/api/categories?${filterLink}`,
    method: "get",
  });
  const categories = data?.items ?? [];
  const count = data?.count ?? 0;
  const pages = data?.pages ?? 1;

  const handleOpenModal = (itemToEdit = null) => {
    setItemToEdit(itemToEdit);
    setShowModal(true);
  };

  const handleCloseModal = (refresh = false) => {
    setShowModal(false);
    if (refresh) {
      refreshData();
    }
  };

  return (
    <>
      <PageBanner pageTitle="Manage categories" admin />
      <Container>
        <div className="admin-table-container">
          {!loading && error && <p className="alert alert-danger text-center">Something went wrong!</p>}
          <div className="admin-toolbar">
            <PerPageFilter perPage={perPage} onChange={setPerPage} />
            <SearchFilter onChange={setSearch} />
            <Button className="btn-success" onClick={() => handleOpenModal()}>
              Add new category
            </Button>
          </div>
          <div className="admin-table">
            <div className="table-head">
              <span>ID</span>
              <span>Name</span>
              <span>Products</span>
              <span>Packages</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            <div className="table-body">
              {loading && <LoadingSpinner />}
              {!loading && !error && categories.length === 0 && <p className="text-center">No categories found!</p>}
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
      </Container>
      <ManageCategoryModal show={showModal} closeModal={handleCloseModal} itemToEdit={itemToEdit} />
    </>
  );
};

export default ManageCategory;
