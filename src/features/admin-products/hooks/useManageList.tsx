import { useState } from "react";
import { ProductDetails } from "../../../types";

export const useManageList = () => {
  const [showModal, setShowModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<ProductDetails | null>(null);
  const [productList, setProductList] = useState<ProductDetails[]>([]);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [categories, setCategories] = useState<number[]>([]);

  const handleEditProduct = (product: ProductDetails) => {
    setShowModal(true);

    product.images = product.images.map((image) => {
      return { ...image, productId: product.id };
    });

    setItemToEdit(product);
  };

  return {
    showModal,
    itemToEdit,
    productList,
    hasMoreProducts,
    categories,
    setShowModal,
    setItemToEdit,
    setProductList,
    setHasMoreProducts,
    handleEditProduct,
    setCategories,
  };
};
