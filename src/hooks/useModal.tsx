import { useState } from "react";

export function useModal<T = unknown>() {
  const [showModal, setShowModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<T | null>(null);

  const openModal = (itemToEdit = null) => {
    setItemToEdit(itemToEdit);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return { showModal, itemToEdit, openModal, closeModal };
}
