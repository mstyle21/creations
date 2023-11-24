import { useState, useEffect } from "react";
import { CategoryDetails } from "../../../types";

export const useManageCategory = (itemToEdit: CategoryDetails | null) => {
  const [name, setName] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    setName(itemToEdit ? itemToEdit.name : "");
    setActive(itemToEdit ? itemToEdit.status === "active" : true);
  }, [itemToEdit]);

  const resetValues = () => {
    setName("");
    setActive(true);
  };

  return { name, active, setName, setActive, resetValues };
};
