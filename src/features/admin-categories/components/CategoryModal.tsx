import { Button, Form, Modal } from "react-bootstrap";
import { axiosInstance } from "../../../services/AxiosService";
import { CategoryDetails, GeneralModalProps } from "../../../types";
import { useManageCategory } from "../hooks/useManageCategory";

const CategoryModal = ({ show, closeModal, itemToEdit }: GeneralModalProps<CategoryDetails>) => {
  const { name, active, errors, setName, setActive, setErrors, resetValues } = useManageCategory(itemToEdit);

  const handleSaveCategory = () => {
    if (!name) {
      setErrors((prev) => ({ ...prev, name: "Name is required." }));
      return false;
    }
    const data = {
      name: name,
      status: active ? "active" : "inactive",
    };

    const url = `/api/categories/${itemToEdit ? itemToEdit.id : ""}`;

    //TODO: use react-query mutation
    axiosInstance
      .request({
        method: itemToEdit ? "put" : "post",
        url: url,
        data: data,
      })
      .then((response) => {
        if (response.status === 201) {
          resetValues();
          closeModal(true);
        }
      })
      .catch((error: Error) => {
        setErrors((prev) => ({ ...prev, axios: error.message }));
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
          <Form.Check
            type="switch"
            label={active ? "Active" : "Inactive"}
            checked={active}
            onChange={() => setActive((prev) => !prev)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="primary" onClick={handleSaveCategory}>
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
    </Modal>
  );
};

export default CategoryModal;
