import { capitalize } from "lodash";
import { useState } from "react";
import { Button } from "react-bootstrap";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Paginator from "../../../components/Paginator";
import PaginatorInfo from "../../../components/PaginatorInfo";
import PerPageFilter from "../../../components/filters/PerPage";
import SearchFilter from "../../../components/filters/Search";
import { BACKEND_URL, CURRENCY_SIGN } from "../../../config";
import { useFilters } from "../../../hooks/useFilters";
import { ProductDetails } from "../../../types";
import ProductModal from "./ProductModal";
import noImage from "../../../assets/no-image.jpg";
import { stockColor } from "../../../utils";
import { useProducts } from "../api/getProducts";

const perPageOptions = [10, 20, 50, 100];

const ProductList = () => {
  const [showModal, setShowModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<ProductDetails | null>(null);
  const { page, perPage, filterLink, setPage, setPerPage, setSearch } = useFilters();

  const { products, count, pages, error, loading, refreshData } = useProducts({ filters: filterLink });

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
      <div className="admin-table-container">
        {!loading && error && <p className="alert alert-danger text-center">Something went wrong!</p>}
        <div className="admin-toolbar">
          <PerPageFilter perPageOptions={perPageOptions} onChange={setPerPage} />
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
                    <span>{product.name}</span>
                    <span style={{ color: stockColor(product.stock), fontWeight: "bold" }}>{product.stock}</span>
                    <span>
                      {product.price} {CURRENCY_SIGN}
                    </span>
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
      <ProductModal show={showModal} closeModal={handleCloseModal} itemToEdit={itemToEdit} />
    </>
  );
};

export default ProductList;
