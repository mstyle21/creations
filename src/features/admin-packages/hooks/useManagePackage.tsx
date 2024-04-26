import { useEffect, useReducer, useState } from "react";
import { PackageDetails, PackageItem } from "../../../types";
import { packageImagesReducer } from "../reducers/packageImagesReducer";
import { packageProductsReducer } from "../reducers/packageProductsReducer";

export const MAX_PACKAGE_IMAGES = 5;

export const useManagePackage = (itemToEdit: PackageDetails | null, presetItems: PackageItem[] = []) => {
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
    let dispatchPayload: PackageItem[] = [];
    if (itemToEdit) {
      dispatchPayload = itemToEdit.products.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        stock: item.product.stock,
        image: item.product.images[0]?.filename ?? null,
      }));
    } else if (presetItems.length > 0) {
      dispatchPayload = presetItems;
    }
    setName(itemToEdit ? itemToEdit.name : "");
    setStock(itemToEdit ? itemToEdit.stock : "");
    setPrice(itemToEdit ? itemToEdit.price : "");
    setOldPrice(itemToEdit && itemToEdit.oldPrice ? itemToEdit.oldPrice : "");
    setActive(itemToEdit ? itemToEdit.status === "active" : true);
    setCategory(itemToEdit ? itemToEdit.category.id : "");
    dispatchProducts({ type: "reset" });
    dispatchProducts({
      type: "set",
      payload: dispatchPayload,
    });
    dispatchImages({ type: "reset" });
    dispatchImages({ type: "set", payload: itemToEdit ? itemToEdit.images : [] });
  }, [itemToEdit, presetItems]);

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
