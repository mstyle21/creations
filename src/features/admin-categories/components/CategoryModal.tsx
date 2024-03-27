import { Button, Form, Modal } from "react-bootstrap";
import { CategoryDetails, GeneralModalProps } from "../../../types";
import { useManageCategory } from "../hooks/useManageCategory";
import { useSaveCategory } from "../api/saveCategory";

const CategoryModal = ({ show, closeModal, itemToEdit }: GeneralModalProps<CategoryDetails>) => {
  const { name, active, errors, setName, setActive, setErrors, resetValues } = useManageCategory(itemToEdit);
  const saveCategory = useSaveCategory();

  const handleSaveCategory = (shouldCloseModal = false) => {
    if (!name) {
      setErrors((prev) => ({ ...prev, name: "Name is required." }));
      return false;
    }
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
      },
      onError: (error) => {
        setErrors((prev) => ({ ...prev, axios: error.message }));
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
        <Button variant="primary" onClick={() => handleSaveCategory(!!itemToEdit)}>
          Save
        </Button>
        {!itemToEdit && (
          <Button variant="primary" onClick={() => handleSaveCategory(true)}>
            Save and close
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
