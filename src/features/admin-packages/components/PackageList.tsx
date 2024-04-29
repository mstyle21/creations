import { capitalize } from "lodash";
import { Button } from "react-bootstrap";
import LoadingSpinner from "../../../components/LoadingSpinner";
import SearchFilter from "../../../components/filters/Search";
import { BACKEND_URL, CURRENCY_SIGN, THUMBNAIL_PREFIX } from "../../../config";
import { DEFAULT_IMAGE, stockColor } from "../../../utils";
import PackageModal from "./PackageModal";
import { useManageList } from "../hooks/useManageList";
import ReactSelect from "react-select";

const sortOptions = [
  { label: "Nume", value: "name" },
  { label: "Stoc", value: "stock" },
  { label: "Pret", value: "price" },
];

const PackageList = () => {
  const {
    showModal,
    itemToEdit,
    packageList,
    loading,
    error,
    setSearch,
    setPage,
    setShowModal,
    setItemToEdit,
    handleEditPackage,
    handleCloseModal,
    handleSort,
    togglePackageStatus,
  } = useManageList();

  return (
    <>
      {!loading && error && <p className="alert alert-danger text-center">Something went wrong!</p>}

      <div className="admin-toolbar">
        <SearchFilter onChange={setSearch} />
        <ReactSelect
          options={sortOptions}
          placeholder="Sort"
          onChange={(newValue) => {
            if (newValue) {
              handleSort(newValue.value);
              setPage(1);
            }
          }}
          styles={{
            container: (baseStyles) => ({
              ...baseStyles,
              width: "250px",
            }),
            indicatorSeparator: (baseStyles) => ({
              ...baseStyles,
              display: "none",
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              zIndex: 5,
            }),
          }}
        />
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

      <div className="admin-product-list-container">
        {loading && <LoadingSpinner />}
        {packageList.length > 0 && (
          <div className="admin-product-list">
            {packageList.map((packageDetails) => {
              const imgSrc =
                packageDetails.images.length > 0
                  ? `${BACKEND_URL}/packages/${packageDetails.id}/${THUMBNAIL_PREFIX}${packageDetails.images[0].filename}`
                  : DEFAULT_IMAGE;

              return (
                <div className="admin-product-box" key={packageDetails.id} onDoubleClick={() => handleEditPackage({ ...packageDetails })}>
                  <div className="position-relative">
                    <img className="admin-product-image" src={imgSrc} />
                    <span
                      className="admin-product-status"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePackageStatus(packageDetails);
                      }}
                      style={{ backgroundColor: packageDetails.status === "active" ? "green" : "red" }}
                    >
                      {capitalize(packageDetails.status)}
                    </span>
                    <span className="admin-product-price">
                      {packageDetails.price / 100} {CURRENCY_SIGN}
                    </span>
                  </div>

                  <strong className="admin-product-name">
                    {packageDetails.name}
                    <span style={{ color: stockColor(packageDetails.stock), fontWeight: "bold" }}>({packageDetails.stock})</span>
                  </strong>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <PackageModal show={showModal} closeModal={handleCloseModal} itemToEdit={itemToEdit} presetItems={[]} />
    </>
  );
};

export default PackageList;
