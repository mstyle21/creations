import { useState } from "react";
import { PackageItem, ProductDetails } from "../../../types";

export const useQuickPackage = () => {
  const [quickPackage, setQuickPackage] = useState<PackageItem[]>([]);
  const [showQuickPackageModal, setShowQuickPackageModal] = useState(false);

  const handleBoxClick = (product: ProductDetails) => {
    if (isProductSelected(product)) {
      setQuickPackage((prev) => prev.filter((item) => item.productId !== product.id));
    } else {
      setQuickPackage((prev) => [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          quantity: 1,
          stock: product.stock,
          image: product.images[0]?.filename ?? null,
        },
      ]);
    }
  };

  const isProductSelected = (product: ProductDetails) => {
    let result = false;
    quickPackage.forEach((elem) => {
      if (elem.productId === product.id) {
        result = true;
      }
    });

    return result;
  };

  return {
    quickPackage,
    showQuickPackageModal,
    handleBoxClick,
    setShowQuickPackageModal,
    isProductSelected,
  };
};
