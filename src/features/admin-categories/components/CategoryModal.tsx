import { Button, Form, Modal } from "react-bootstrap";
import { CategoryDetails, GeneralModalProps } from "../../../types";
import { useManageCategory } from "../hooks/useManageCategory";
import { useSaveCategory } from "../../../api/categories/saveCategory";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CategoryModal = ({ show, closeModal, itemToEdit }: GeneralModalProps<CategoryDetails>) => {
  const { name, active, errors, isSubmitting, setName, setActive, setErrors, setIsSubmitting, resetValues } = useManageCategory(itemToEdit);
  const saveCategory = useSaveCategory();

  const handleSaveCategory = (shouldCloseModal = false) => {
    if (!name) {
      setErrors((prev) => ({ ...prev, name: "Name is required." }));
      return false;
    }

    setIsSubmitting(true);

    const data: { id?: number; name: string; status: "active" | "inactive" } = {
      id: itemToEdit?.id,
      name: name,
      status: active ? "active" : "inactive",
    };

    saveCategory.mutate(data, {
      onSuccess: () => {
        resetValues();

        if (shouldCloseModal) {
          closeModal();
        }
        setIsSubmitting(false);
      },
      onError: (error) => {
        setErrors((prev) => ({ ...prev, axios: error.message }));
        setIsSubmitting(false);
      },
    });
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header
        closeButton
        onHide={() => {
          closeModal();
          resetValues();
        }}
      >
        <Modal.Title>{itemToEdit ? "Edit" : "Add"} category</Modal.Title>
      </Modal.Header>
      {Object.values(errors).length > 0 && (
        <div className="alert alert-danger">
          {Object.values(errors).map((error, index) => (
            <p style={{ margin: 0 }} key={index}>
              {error}
            </p>
          ))}
        </div>
      )}
      <Modal.Body className="d-grid gap-3">
        <Form.Group controlId="formText">
          <Form.Label>Category name</Form.Label>
          <Form.Control type="text" placeholder="categ..." value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formCheck">
          <Form.Label>Status</Form.Label>
          <Form.Check type="switch" label={active ? "Active" : "Inactive"} checked={active} onChange={() => setActive((prev) => !prev)} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="primary" disabled={isSubmitting} onClick={() => handleSaveCategory(!!itemToEdit)}>
          {isSubmitting ? <FontAwesomeIcon icon={faSpinner} pulse size="2x" /> : "Save"}
        </Button>
        {!itemToEdit && (
          <Button variant="primary" disabled={isSubmitting} onClick={() => handleSaveCategory(true)}>
            {isSubmitting ? <FontAwesomeIcon icon={faSpinner} pulse size="2x" /> : "Save and close"}
          </Button>
        )}
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
    </Modal>
  );
};

export default CategoryModal;
