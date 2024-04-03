import { useEffect, useReducer, useState } from "react";
import { PackageDetails } from "../../../types";
import { packageImagesReducer } from "../reducers/packageImagesReducer";
import { packageProductsReducer } from "../reducers/packageProductsReducer";

export const MAX_PACKAGE_IMAGES = 5;

export const useManagePackage = (itemToEdit: PackageDetails | null) => {
  const [name, setName] = useState("");
  const [stock, setStock] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [oldPrice, setOldPrice] = useState<number | "">("");
  const [active, setActive] = useState(true);
  const [category, setCategory] = useState<number | "">("");
  const [products, dispatchProducts] = useReducer(packageProductsReducer, []);
  const [images, dispatchImages] = useReducer(packageImagesReducer, []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName(itemToEdit ? itemToEdit.name : "");
    setStock(itemToEdit ? itemToEdit.stock : "");
    setPrice(itemToEdit ? itemToEdit.price : "");
    setOldPrice(itemToEdit && itemToEdit.oldPrice ? itemToEdit.oldPrice : "");
    setActive(itemToEdit ? itemToEdit.status === "active" : true);
    setCategory(itemToEdit ? itemToEdit.category.id : "");
    dispatchProducts({ type: "reset" });
    dispatchProducts({
      type: "set",
      payload: itemToEdit
        ? itemToEdit.products.map((item) => ({
            productId: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            image: item.product.images[0]?.filename ?? null,
          }))
        : [],
    });
    dispatchImages({ type: "reset" });
    dispatchImages({ type: "set", payload: itemToEdit ? itemToEdit.images : [] });
  }, [itemToEdit]);

  const resetValues = () => {
    setName("");
    setStock("");
    setPrice("");
    setOldPrice("");
    setActive(true);
    setCategory("");
    dispatchProducts({ type: "reset" });
    dispatchImages({ type: "reset" });
  };

  return {
    name,
    stock,
    price,
    oldPrice,
    active,
    category,
    products,
    images,
    isSubmitting,
    setName,
    setStock,
    setPrice,
    setOldPrice,
    setActive,
    setCategory,
    dispatchProducts,
    dispatchImages,
    setIsSubmitting,
    resetValues,
  };
};
