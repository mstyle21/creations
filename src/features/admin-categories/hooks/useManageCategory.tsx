import { useState, useEffect } from "react";
import { CategoryDetails } from "../../../types";

export const useManageCategory = (itemToEdit: CategoryDetails | null) => {
  const [name, setName] = useState("");
  const [active, setActive] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName(itemToEdit ? itemToEdit.name : "");
    setActive(itemToEdit ? itemToEdit.status === "active" : true);
  }, [itemToEdit]);

  const resetValues = () => {
    setName("");
    setActive(true);
    setErrors({});
  };

  return { name, active, errors, isSubmitting, setName, setActive, setErrors, setIsSubmitting, resetValues };
};
