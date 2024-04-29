import { useEffect, useReducer, useState } from "react";
import { PackageDetails, PackageItem } from "../../../types";
import { packageImagesReducer } from "../reducers/packageImagesReducer";
import { packageProductsReducer } from "../reducers/packageProductsReducer";
import { useGetAllCategories } from "../../../api/categories/getAllCategories";
import { useSavePackage } from "../../../api/packages/savePackage";

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
  const { categoryList, error, isLoading } = useGetAllCategories({});
  const savePackage = useSavePackage();

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

  const maxStock = products.reduce((result: number | null, item) => {
    const maxItemStock = Math.floor(item.stock / item.quantity);

    if (result === null || result > maxItemStock) {
      return maxItemStock;
    }

    return result;
  }, null);

  const handleSavePackage = (closeModal: (refresh: boolean) => void) => {
    setIsSubmitting(true);

    const formData = new FormData();
    if (itemToEdit) {
      formData.append("id", itemToEdit.id.toString());
    }
    formData.append("name", name);
    formData.append("stock", stock.toString());
    formData.append("price", price.toString());
    formData.append("oldPrice", oldPrice.toString());
    formData.append("status", active ? "active" : "inactive");
    formData.append("category", category.toString());
    formData.append("products", JSON.stringify(products));

    const imagesOrder: { [key: string]: number } = {};

    images.forEach((image) => {
      if (image.file !== undefined) {
        formData.append("images", image.file, image.file.name);
        imagesOrder[image.file.name] = image.order;
      } else {
        imagesOrder[image.filename] = image.order;
      }
    });

    formData.append("imagesOrder", JSON.stringify(imagesOrder));

    savePackage.mutate(formData, {
      onSuccess: (response) => {
        if (response.status === 201) {
          resetValues();
          closeModal(true);
        }
        setIsSubmitting(false);
      },
      onError: (error: Error) => {
        console.error(error);
        setIsSubmitting(false);
      },
    });
  };

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
    isLoading,
    error,
    categoryList,
    maxStock,
    setName,
    setStock,
    setPrice,
    setOldPrice,
    setActive,
    setCategory,
    dispatchProducts,
    dispatchImages,
    setIsSubmitting,
    handleSavePackage,
    resetValues,
  };
};
