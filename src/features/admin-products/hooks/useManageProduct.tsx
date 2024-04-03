import { useEffect, useReducer, useState } from "react";
import { ProductDetails } from "../../../types";
import { productImagesReducer } from "../reducers/productImagesReducer";

export const MAX_PRODUCT_IMAGES = 5;

export const useManageProduct = (itemToEdit: ProductDetails | null) => {
  const [name, setName] = useState("");
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [depth, setDepth] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [oldPrice, setOldPrice] = useState<number | "">("");
  const [materialWeight, setMaterialWeight] = useState<number | "">("");
  const [active, setActive] = useState(true);
  const [categories, setCategories] = useState<number[]>([]);
  const [images, dispatchImages] = useReducer(productImagesReducer, []);
  const [manageErrors, setManageErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName(itemToEdit ? itemToEdit.name : "");
    setWidth(itemToEdit ? itemToEdit.width : "");
    setHeight(itemToEdit ? itemToEdit.height : "");
    setDepth(itemToEdit ? itemToEdit.depth : "");
    setStock(itemToEdit ? itemToEdit.stock : "");
    setPrice(itemToEdit ? itemToEdit.price : "");
    setOldPrice(itemToEdit && itemToEdit.oldPrice ? itemToEdit.oldPrice : "");
    setMaterialWeight(itemToEdit && itemToEdit.materialWeight ? itemToEdit.materialWeight : "");
    setActive(itemToEdit ? itemToEdit.status === "active" : true);
    setCategories(itemToEdit ? itemToEdit.categories.map((item) => item.id) : []);
    dispatchImages({ type: "reset" });
    dispatchImages({ type: "set", payload: itemToEdit ? itemToEdit.images : [] });
    setManageErrors([]);
  }, [itemToEdit]);

  const resetValues = () => {
    setName("");
    setWidth("");
    setHeight("");
    setDepth("");
    setStock("");
    setPrice("");
    setOldPrice("");
    setMaterialWeight("");
    setActive(true);
    setCategories([]);
    dispatchImages({ type: "reset" });
    setManageErrors([]);
  };

  return {
    name,
    width,
    height,
    depth,
    stock,
    price,
    oldPrice,
    active,
    materialWeight,
    categories,
    images,
    manageErrors,
    isSubmitting,
    setName,
    setWidth,
    setHeight,
    setDepth,
    setStock,
    setPrice,
    setOldPrice,
    setActive,
    setMaterialWeight,
    setCategories,
    dispatchImages,
    setManageErrors,
    setIsSubmitting,
    resetValues,
  };
};
