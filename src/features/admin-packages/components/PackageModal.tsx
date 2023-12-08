import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { GeneralModalProps, PackageDetails } from "../../../types";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useAllCategories } from "../../../api/getAllCategories";
import { useManagePackage } from "../hooks/useManagePackage";
import { axiosInstance } from "../../../services/AxiosService";
import PackageImageUpload from "./PackageImageUpload";
import PackageItems from "./PackageItems";

const PackageModal = ({ show, closeModal, itemToEdit }: GeneralModalProps<PackageDetails>) => {
  const {
    name,
    stock,
    price,
    oldPrice,
    active,
    category,
    products,
    images,
    setName,
    setStock,
    setPrice,
    setOldPrice,
    setActive,
    setCategory,
    dispatchProducts,
    dispatchImages,
    resetValues,
  } = useManagePackage(itemToEdit);

  const { categoryList, error, isLoading } = useAllCategories({});

  const handleSavePackage = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("stock", stock.toString());
    formData.append("price", price.toString());
    formData.append("oldPrice", oldPrice.toString());
    formData.append("status", active ? "active" : "inactive");
    formData.append("category", category.toString());
    formData.append("products", JSON.stringify(products));

    const imagesOrder: { [key: string]: number } = {};

    images.forEach((image) => {
      if (image.file !== undefined) {
        formData.append("images", image.file, image.file.name);
        imagesOrder[image.file.name] = image.order;
      } else {
        imagesOrder[image.filename] = image.order;
      }
    });

    formData.append("imagesOrder", JSON.stringify(imagesOrder));

    const url = `/api/packages/${itemToEdit ? itemToEdit.id : ""}`;

    axiosInstance
      .request({
        method: itemToEdit ? "put" : "post",
        url: url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          resetValues();
          closeModal(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal show={show} onHide={closeModal} dialogClassName="modal-fullscreen">
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
                <Form.Control
                  type="text"
                  placeholder="Name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FloatingLabel>
              <div className="d-grid gap-3" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                <FloatingLabel label="Stock">
                  <Form.Control
                    type="number"
                    placeholder="Stock..."
                    value={stock}
                    onChange={(e) => setStock(e.target.value === "" ? e.target.value : parseInt(e.target.value))}
                  />
                </FloatingLabel>
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
                    value={price}
                    onChange={(e) => setPrice(e.target.value === "" ? e.target.value : parseFloat(e.target.value))}
                  />
                </FloatingLabel>
                <FloatingLabel label="Old price">
                  <Form.Control
                    type="number"
                    placeholder="Old price..."
                    step="0.01"
                    value={oldPrice}
                    onChange={(e) => setOldPrice(e.target.value === "" ? e.target.value : parseFloat(e.target.value))}
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
            <Button variant="primary" onClick={handleSavePackage}>
              Save
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
