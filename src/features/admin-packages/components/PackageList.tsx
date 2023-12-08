import { useState } from "react";
import { useFilters } from "../../../hooks/useFilters";
import { usePackages } from "../api/getPackages";
import { capitalize } from "lodash";
import { Button } from "react-bootstrap";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Paginator from "../../../components/Paginator";
import PaginatorInfo from "../../../components/PaginatorInfo";
import PerPageFilter from "../../../components/filters/PerPage";
import SearchFilter from "../../../components/filters/Search";
import { BACKEND_URL, CURRENCY_SIGN } from "../../../config";
import { DEFAULT_IMAGE, stockColor } from "../../../utils";
import { PackageDetails } from "../../../types";
import PackageModal from "./PackageModal";

const perPageOptions = [10, 20, 50, 100];

const PackageList = () => {
  const [showModal, setShowModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<PackageDetails | null>(null);
  const { page, perPage, filterLink, setPage, setPerPage, setSearch } = useFilters();

  const { packages, count, pages, error, loading, refreshData } = usePackages({ filters: filterLink });

  const handleCloseModal = (refresh = false) => {
    setShowModal(false);
    if (refresh) {
      refreshData();
    }
  };

  const handleEditPackage = (packageDetails: PackageDetails) => {
    setShowModal(true);

    packageDetails.images = packageDetails.images.map((image) => {
      return { ...image, packageId: packageDetails.id };
    });

    setItemToEdit(packageDetails);
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
            Add new package
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
            {!loading && !error && packages.length === 0 && <p className="text-center pt-3">No packages found!</p>}
            {packages.length > 0 &&
              packages.map((packageDetails) => {
                const imgSrc =
                  packageDetails.images.length > 0
                    ? `${BACKEND_URL}/packages/${packageDetails.id}/${packageDetails.images[0].filename}`
                    : DEFAULT_IMAGE;
                return (
                  <div className="table-row" key={packageDetails.id}>
                    <span>
                      <img height="50px" src={imgSrc} />
                    </span>
                    <span>{packageDetails.name}</span>
                    <span style={{ color: stockColor(packageDetails.stock), fontWeight: "bold" }}>
                      {packageDetails.stock}
                    </span>
                    <span>
                      {packageDetails.price} {CURRENCY_SIGN}
                    </span>
                    <span style={{ fontWeight: "bold", color: packageDetails.status === "active" ? "green" : "red" }}>
                      {capitalize(packageDetails.status)}
                    </span>
                    <span>
                      <Button
                        onClick={() => {
                          handleEditPackage({ ...packageDetails });
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
      <PackageModal show={showModal} closeModal={handleCloseModal} itemToEdit={itemToEdit} />
    </>
  );
};

export default PackageList;
