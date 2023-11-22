import { Button, Container } from "react-bootstrap";
import PageBanner from "../components/PageBanner";
import PerPageFilter from "../components/filters/PerPage";
import PaginatorInfo from "../components/PaginatorInfo";
import Paginator from "../components/Paginator";
import SearchFilter from "../components/filters/Search";
import { capitalize } from "../utils";
import { useFilters } from "../hooks/useFilters";
import useAxios from "../hooks/useAxios";
import { ApiPaginatedResponse, ProductDetails } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";
import { useState } from "react";
import ManageProductModal from "../features/ManageProductModal";
import { BACKEND_URL } from "../config";
import noImage from "../assets/no-image.jpg";

const ManageProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<ProductDetails | null>(null);
  const { page, perPage, filterLink, setPage, setPerPage, setSearch } = useFilters();

  const { data, error, loading, refreshData } = useAxios<ApiPaginatedResponse<ProductDetails>>({
    url: `/api/products?${filterLink}`,
    method: "get",
  });
  const products = data?.items ?? [];
  const count = data?.count ?? 0;
  const pages = data?.pages ?? 1;

  const handleCloseModal = (refresh = false) => {
    setShowModal(false);
    if (refresh) {
      refreshData();
    }
  };

  const handleEditProduct = (product: ProductDetails) => {
    setShowModal(true);

    product.images = product.images.map((image) => {
      return { ...image, productId: product.id };
    });

    setItemToEdit(product);
  };

  return (
    <>
      <PageBanner pageTitle="Manage products" admin />
      <Container>
        <div className="admin-table-container">
          {!loading && error && <p className="alert alert-danger text-center">Something went wrong!</p>}
          <div className="admin-toolbar">
            <PerPageFilter perPage={perPage} onChange={setPerPage} />
            <SearchFilter onChange={setSearch} />
            <Button
              className="btn-success"
              onClick={() => {
                setItemToEdit(null);
                setShowModal(true);
              }}
            >
              Add new product
            </Button>
          </div>
          <div className="admin-table">
            <div className="table-head">
              <span></span>
              <span>ID</span>
              <span>Name</span>
              <span>Stock</span>
              <span>Price</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            <div className="table-body">
              {loading && <LoadingSpinner />}
              {!loading && !error && products.length === 0 && <p className="text-center pt-3">No products found!</p>}
              {products.length > 0 &&
                products.map((product) => {
                  const imgSrc =
                    product.images.length > 0
                      ? `${BACKEND_URL}/products/${product.id}/${product.images[0].filename}`
                      : noImage;
                  return (
                    <div className="table-row" key={product.id}>
                      <span>
                        <img height="50px" src={imgSrc} />
                      </span>
                      <span>{product.id}</span>
                      <span>{product.name}</span>
                      <span>{product.stock}</span>
                      <span>{product.price}</span>
                      <span style={{ fontWeight: "bold", color: product.status === "active" ? "green" : "red" }}>
                        {capitalize(product.status)}
                      </span>
                      <span>
                        <Button
                          onClick={() => {
                            handleEditProduct({ ...product });
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
      <ManageProductModal show={showModal} closeModal={handleCloseModal} itemToEdit={itemToEdit} />
    </>
  );
};

export default ManageProduct;
