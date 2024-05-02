import { faCirclePlus, faPlus, faSpinner, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReducer, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import ReactSelect, { SingleValue } from "react-select";
import { useGetAllProductsAndPackages } from "../../../api/products/getAllProductsAndPackages";
import { orderItemsReducer } from "../reducers/orderItemsReducer";
import { BACKEND_URL, THUMBNAIL_PREFIX } from "../../../config";
import { DEFAULT_IMAGE } from "../../../utils";

const AddOrder = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div style={{ display: "none" }} className="add-order-btn" onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={faPlus} className="add-order-icon" />
      </div>

      <AddOrderModal show={showModal} closeModal={handleCloseModal} />
    </>
  );
};

type AddOrderModalProps = {
  show: boolean;
  closeModal: () => void;
};

const AddOrderModal = ({ show, closeModal }: AddOrderModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [validated, setValidated] = useState(false);
  const [quantity, setQuantity] = useState<number | "">("");
  const [items, dispatchItems] = useReducer(orderItemsReducer, []);
  const { products } = useGetAllProductsAndPackages({
    config: {
      enabled: show,
    },
  });

  const handleItemSave = () => {
    if (selectedItem === "" || quantity === "" || quantity < 1) {
      setValidated(true);
      return false;
    }

    const [type, id] = selectedItem.split("_");
    const itemFound = products.find((item) => item.type === type && item.id.toString() === id);

    if (itemFound) {
      dispatchItems({
        type: "add",
        payload: {
          quantity: quantity,
          id: itemFound.id,
          name: itemFound.name,
          type: itemFound.type,
          image: itemFound.images[0]?.filename ?? null,
        },
      });
      setSelectedItem("");
      setQuantity("");
      setValidated(false);
    }
  };

  const handleSaveOrder = () => {
    setIsSubmitting(true);
  };

  return (
    <Modal show={show} onHide={closeModal} size="xl">
      <Modal.Header closeButton onHide={() => closeModal()}>
        <Modal.Title>Add order</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-grid gap-3">
        <div className="manage-order-item">
          <ReactSelect
            isSearchable
            options={Object.values(
              products.reduce((result: { [key: string]: { label: string; options: { label: string; value: string }[] } }, item) => {
                result[item.type] ??= {
                  label: item.type === "product" ? "Figurine" : "Seturi",
                  options: [],
                };

                result[item.type].options.push({
                  label: item.name,
                  value: `${item.type}_${item.id}`,
                });

                return result;
              }, {})
            )}
            onChange={(e: SingleValue<{ label: string; value: string }>) => setSelectedItem(e?.value ?? "")}
            placeholder={"Selecteaza un item"}
            styles={{
              container: (baseStyles) => ({
                ...baseStyles,
                border: validated && selectedItem === "" ? "1px solid red" : "initial",
              }),
              control: (baseStyles) => ({
                ...baseStyles,
                height: "58px",
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
          <FloatingLabel label="Quantity" style={{ border: validated && (quantity === 0 || quantity === "") ? "1px solid red" : "" }}>
            <Form.Control type="number" onChange={(e) => setQuantity(e.target.value !== "" ? parseInt(e.target.value) : "")} />
          </FloatingLabel>
          <FontAwesomeIcon onClick={handleItemSave} className="save-package-item" icon={faCirclePlus} size="2x" />
        </div>
        <div>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr 100px 100px",
                padding: "10px 0",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <img
                style={{ height: "50px" }}
                src={item.image ? `${BACKEND_URL}/${item.type}s/${item.id}/${THUMBNAIL_PREFIX}${item.image}` : DEFAULT_IMAGE}
              />
              <span>{item.name}</span>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value);
                  if (!isNaN(newQuantity) && newQuantity > 0) {
                    dispatchItems({ type: "edit", payload: { ...item, quantity: newQuantity } });
                  }
                }}
                style={{ width: "80px", border: "none", borderBottom: "1px solid black", textAlign: "center" }}
              />
              <FontAwesomeIcon
                icon={faTrashAlt}
                onClick={() => dispatchItems({ type: "delete", payload: item })}
                color="red"
                fontSize="20px"
                cursor="pointer"
              />
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="primary" disabled={isSubmitting} onClick={() => handleSaveOrder()}>
          {isSubmitting ? <FontAwesomeIcon icon={faSpinner} pulse size="2x" /> : "Save"}
        </Button>

        <Button variant="secondary" onClick={() => closeModal()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddOrder;
