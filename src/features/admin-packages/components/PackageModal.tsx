import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { GeneralModalProps, PackageDetails, PackageItem } from "../../../types";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useManagePackage } from "../hooks/useManagePackage";
import PackageImageUpload from "./PackageImageUpload";
import PackageItems from "./PackageItems";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PackageModalProps = GeneralModalProps<PackageDetails> & { presetItems?: PackageItem[] };

const PackageModal = ({ show, closeModal, itemToEdit, presetItems = [] }: PackageModalProps) => {
  const {
    name,
    stock,
    price,
    oldPrice,
    active,
    category,
    products,
    images,
    isSubmitting,
    isLoading,
    error,
    categoryList,
    maxStock,
    setName,
    setStock,
    setPrice,
    setOldPrice,
    setActive,
    setCategory,
    dispatchProducts,
    dispatchImages,
    handleSavePackage,
    resetValues,
  } = useManagePackage(itemToEdit, presetItems);

  return (
    <Modal show={show} onHide={closeModal} dialogClassName="modal-fullscreen" className="package-modal">
      <Modal.Header
        closeButton
        onHide={() => {
          closeModal();
          resetValues();
        }}
      >
        <Modal.Title>{itemToEdit ? "Edit" : "Add"} package</Modal.Title>
      </Modal.Header>
      {isLoading && <LoadingSpinner />}
      {error && <p className="alert alert-danger">Something went wrong!</p>}
      {categoryList && categoryList.length && (
        <>
          <Modal.Body className="d-grid gap-3" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            <div className="d-flex flex-column gap-3">
              <h2 className="text-center">Details</h2>
              <FloatingLabel label="Package name">
                <Form.Control type="text" placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)} />
              </FloatingLabel>
              <div className="d-grid gap-3" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                <div className="d-flex align-items-center gap-3">
                  <FloatingLabel label="Stock">
                    <Form.Control
                      type="number"
                      placeholder="Stock..."
                      value={stock}
                      onChange={(e) => setStock(e.target.value === "" ? e.target.value : parseInt(e.target.value))}
                    />
                  </FloatingLabel>
                  {maxStock && (
                    <strong style={{ color: stock === "" ? "initial" : stock > maxStock ? "red" : "green" }}>({maxStock})</strong>
                  )}
                </div>
                <Form.Group controlId="formCheck" className="m-auto">
                  <Form.Check
                    type="switch"
                    label={active ? "Active" : "Inactive"}
                    checked={active}
                    onChange={() => setActive((prev) => !prev)}
                  />
                </Form.Group>
              </div>

              <div className="d-flex gap-3 align-items-center">
                <FloatingLabel label="Price">
                  <Form.Control
                    type="number"
                    placeholder="Price..."
                    step="0.01"
                    value={price !== "" ? price / 100 : price}
                    onChange={(e) => setPrice(e.target.value === "" ? e.target.value : parseFloat(e.target.value) * 100)}
                  />
                </FloatingLabel>
                <FloatingLabel label="Old price">
                  <Form.Control
                    type="number"
                    placeholder="Old price..."
                    step="0.01"
                    value={oldPrice !== "" ? oldPrice / 100 : oldPrice}
                    onChange={(e) => setOldPrice(e.target.value === "" ? e.target.value : parseFloat(e.target.value) * 100)}
                  />
                </FloatingLabel>
              </div>

              <FloatingLabel label="Category">
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value === "" ? e.target.value : parseInt(e.target.value))}
                >
                  <option disabled value="">
                    Choose a category
                  </option>
                  {categoryList.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </FloatingLabel>
            </div>
            <PackageItems packageItems={products} dispatchItems={dispatchProducts} />
            <PackageImageUpload images={images} dispatchImages={dispatchImages} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => handleSavePackage(closeModal)} disabled={isSubmitting}>
              {isSubmitting ? <FontAwesomeIcon icon={faSpinner} pulse size="2x" /> : "Save"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                closeModal();
                resetValues();
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default PackageModal;
