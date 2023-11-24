import { useEffect, useReducer, useState } from "react";
import { ProductDetails } from "../../../types";
import { productImagesReducer } from "../../../reducers/productImagesReducer";

export const MAX_UPLOAD_IMAGES = 5;

export const useManageProduct = (itemToEdit: ProductDetails | null) => {
  const [name, setName] = useState("");
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [depth, setDepth] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [active, setActive] = useState(true);
  const [categories, setCategories] = useState<number[]>([]);
  const [images, dispatchImages] = useReducer(productImagesReducer, []);

  useEffect(() => {
    setName(itemToEdit ? itemToEdit.name : "");
    setWidth(itemToEdit ? itemToEdit.width : "");
    setHeight(itemToEdit ? itemToEdit.height : "");
    setDepth(itemToEdit ? itemToEdit.depth : "");
    setStock(itemToEdit ? itemToEdit.stock : "");
    setPrice(itemToEdit ? itemToEdit.price : "");
    setActive(itemToEdit ? itemToEdit.status === "active" : true);
    setCategories(itemToEdit ? itemToEdit.categories.map((item) => item.id) : []);
    dispatchImages({ type: "reset" });
    dispatchImages({ type: "set", payload: itemToEdit ? itemToEdit.images : [] });
  }, [itemToEdit]);

  const resetValues = () => {
    setName("");
    setWidth("");
    setHeight("");
    setDepth("");
    setStock("");
    setPrice("");
    setActive(true);
    setCategories([]);
    dispatchImages({ type: "reset" });
  };

  return {
    name,
    width,
    height,
    depth,
    stock,
    price,
    active,
    categories,
    images,
    setName,
    setWidth,
    setHeight,
    setDepth,
    setStock,
    setPrice,
    setActive,
    setCategories,
    dispatchImages,
    resetValues,
  };
};
