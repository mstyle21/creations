import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { GeneralModalProps, ProductDetails } from "../../../types";
import { useManageProduct } from "../hooks/useManageProduct";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ProductImageUpload from "./ProductImageUpload";
import { axiosInstance } from "../../../services/AxiosService";
import { useCategories } from "../api/getCategories";

const ProductModal = ({ show, closeModal, itemToEdit }: GeneralModalProps<ProductDetails>) => {
  const {
    name,
    width,
    height,
    depth,
    stock,
    price,
    oldPrice,
    active,
    categories,
    images,
    setName,
    setWidth,
    setHeight,
    setDepth,
    setStock,
    setPrice,
    setOldPrice,
    setActive,
    setCategories,
    dispatchImages,
    resetValues,
  } = useManageProduct(itemToEdit);

  const { categoryList, error, isLoading } = useCategories({});

  const handleSaveProduct = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("width", width.toString());
    formData.append("height", height.toString());
    formData.append("depth", depth.toString());
    formData.append("stock", stock.toString());
    formData.append("price", price.toString());
    formData.append("oldPrice", oldPrice.toString());
    formData.append("status", active ? "active" : "inactive");

    categories.forEach((category) => {
      formData.append("categories", category.toString());
    });

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

    const url = `/api/products/${itemToEdit ? itemToEdit.id : ""}`;

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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const catId = parseInt(e.target.value);
    if (e.target.checked && !categories.includes(catId)) {
      setCategories((prev) => [...prev, catId]);
    }
    if (!e.target.checked && categories.includes(catId)) {
      const categs = categories.filter((category) => category !== catId);
      setCategories(categs);
    }
  };

  return (
    <Modal show={show} onHide={closeModal} size="xl">
      <Modal.Header
        closeButton
        onHide={() => {
          closeModal();
          resetValues();
        }}
      >
        <Modal.Title>{itemToEdit ? "Edit" : "Add"} product</Modal.Title>
      </Modal.Header>
      {isLoading && <LoadingSpinner />}
      {error && <p className="alert alert-danger">Something went wrong!</p>}
      {categoryList && categoryList.length && (
        <>
          <Modal.Body className="d-grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div className="d-flex flex-column gap-3">
              <h2>Details</h2>
              <FloatingLabel label="Product name">
                <Form.Control
                  type="text"
                  placeholder="Name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FloatingLabel>
              <div className="d-flex justify-content-between gap-3">
                <FloatingLabel label="Width">
                  <Form.Control
                    type="number"
                    placeholder="Width..."
                    step="0.1"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value))}
                  />
                </FloatingLabel>
                <FloatingLabel label="Height">
                  <Form.Control
                    type="number"
                    placeholder="Height..."
                    step="0.1"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value))}
                  />
                </FloatingLabel>
                <FloatingLabel label="Depth">
                  <Form.Control
                    type="number"
                    placeholder="Depth..."
                    step="0.1"
                    value={depth}
                    onChange={(e) => setDepth(parseFloat(e.target.value))}
                  />
                </FloatingLabel>
              </div>
              <div className="d-flex gap-3 align-items-center">
                <FloatingLabel label="Stock">
                  <Form.Control
                    type="number"
                    placeholder="Stock..."
                    value={stock}
                    onChange={(e) => setStock(parseInt(e.target.value))}
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
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                  />
                </FloatingLabel>
                <FloatingLabel label="Old price">
                  <Form.Control
                    type="number"
                    placeholder="Old price..."
                    step="0.01"
                    value={oldPrice}
                    onChange={(e) => setOldPrice(parseFloat(e.target.value))}
                  />
                </FloatingLabel>
              </div>
              <Form.Group>
                <Form.Label>Categories</Form.Label>
                <div className="d-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                  {categoryList.map((category) => {
                    return (
                      <Form.Check
                        name="categories"
                        type="checkbox"
                        value={category.id}
                        key={category.id}
                        label={category.name}
                        id={`categ-${category.id}`}
                        checked={categories.includes(category.id)}
                        onChange={(e) => handleCategoryChange(e)}
                      />
                    );
                  })}
                </div>
              </Form.Group>
            </div>
            <ProductImageUpload images={images} dispatchImages={dispatchImages} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSaveProduct}>
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
export default ProductModal;
