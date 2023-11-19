import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { CategoryDetails } from "../pages/ManageCategory";
import { axiosInstance } from "../services/AxiosService";

type ManageCategoryModalProps = {
  show: boolean;
  closeModal: (refresh?: boolean) => void;
  itemToEdit: CategoryDetails | null;
};

const ManageCategoryModal = ({ show, closeModal, itemToEdit }: ManageCategoryModalProps) => {
  const [name, setName] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    setName(itemToEdit ? itemToEdit.name : "");
    setActive(itemToEdit ? itemToEdit.status === "active" : true);
  }, [itemToEdit]);

  const resetModal = () => {
    setName("");
    setActive(true);
  };

  const handleSaveCategory = () => {
    if (!itemToEdit) {
      axiosInstance
        .post(`/api/categories`, { name: name, status: active ? "active" : "inactive" })
        .then((response) => {
          if (response.status === 201) {
            resetModal();
            closeModal(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axiosInstance
        .put(`/api/categories/${itemToEdit.id}`, { name: name, status: active ? "active" : "inactive" })
        .then((response) => {
          if (response.status === 201) {
            resetModal();
            closeModal(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header
        closeButton
        onHide={() => {
          closeModal();
          resetModal();
        }}
      >
        <Modal.Title>{itemToEdit ? "Edit" : "Add"} category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formText">
          <Form.Label>Category name</Form.Label>
          <Form.Control type="text" placeholder="categ..." value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCheck">
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
            resetModal();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ManageCategoryModal;
