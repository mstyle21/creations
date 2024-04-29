import { faCirclePlus, faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import ReactSelect, { SingleValue } from "react-select";

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
const defaultTypeOptions = [
  { label: "Figurina", value: "product" },
  { label: "Set figurine", value: "package" },
];

const AddOrderModal = ({ show, closeModal }: AddOrderModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChoosingType, setIsChoosingType] = useState(true);
  const [typeOptions, setTypeOptions] = useState(defaultTypeOptions);
  const [selectedItem, setSelectedItem] = useState<{ label: string; value: string } | null>(null);

  const handleTypeChange = (item: SingleValue<{ label: string; value: string }>) => {
    if (item === null) {
      return false;
    }
    if (isChoosingType) {
      // setTypeOptions(item.value === "product" ? productOptions : packageOptions);
    } else {
      setTypeOptions(defaultTypeOptions);
      setSelectedItem(item);
    }

    setIsChoosingType((prev) => !prev);
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
            options={typeOptions}
            placeholder={isChoosingType ? "Selecteaza tipul" : "Selecteaza un item"}
            closeMenuOnSelect={!isChoosingType}
            value={selectedItem}
            onChange={(newValue) => {
              if (newValue) {
                handleTypeChange(newValue);
              }
            }}
            styles={{
              container: (baseStyles) => ({
                ...baseStyles,
                border: "initial",
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
          <FloatingLabel label="Quantity">
            <Form.Control type="number" onChange={() => {}} />
          </FloatingLabel>
          <FontAwesomeIcon onClick={() => {}} className="save-package-item" icon={faCirclePlus} size="2x" />
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
