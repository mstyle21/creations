import { useEffect, useState } from "react";
import { PackageDetails } from "../../../types";
import { useGetPackages } from "../../../api/packages/getPackages";
import { useFilters } from "../../../hooks/useFilters";
import { useSavePackage } from "../../../api/packages/savePackage";

export const useManageList = () => {
  const [showModal, setShowModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<PackageDetails | null>(null);
  const [packageList, setPackageList] = useState<PackageDetails[]>([]);
  const [hasMorePackages, setHasMorePackages] = useState(true);
  const { page, filters, setPage, setSearch, handleSort } = useFilters(8 * 4);
  const { packages, pages, error, loading, refreshData } = useGetPackages({ filters });
  const savePackage = useSavePackage();

  useEffect(() => {
    if (!loading) {
      if (page > 1 && packages.length > 0) {
        setPackageList((prev) => [...prev, ...packages]);
      }
      if (page === 1) {
        setPackageList(packages);
      }

      setHasMorePackages(page !== pages);
    }

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

      if (!loading && hasMorePackages && scrollTop + clientHeight >= scrollHeight - 20) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMorePackages]);

  const handleEditPackage = (packageDetails: PackageDetails) => {
    setShowModal(true);

    packageDetails.images = packageDetails.images.map((image) => {
      return { ...image, packageId: packageDetails.id };
    });

    setItemToEdit(packageDetails);
  };

  const togglePackageStatus = (packageDetails: PackageDetails) => {
    const formData = new FormData();

    formData.append("id", packageDetails.id.toString());
    formData.append("name", packageDetails.name);
    formData.append("stock", packageDetails.stock.toString());
    formData.append("price", packageDetails.price.toString());
    formData.append("oldPrice", (packageDetails.oldPrice ?? "").toString());
    formData.append("status", packageDetails.status === "inactive" ? "active" : "inactive");
    formData.append("category", packageDetails.category.id.toString());
    formData.append(
      "products",
      JSON.stringify(
        packageDetails.products.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          stock: item.product.stock,
          image: item.product.images[0]?.filename ?? null,
        }))
      )
    );

    const imagesOrder: { [key: string]: number } = {};
    packageDetails.images.forEach((image) => {
      if (image.file !== undefined) {
        imagesOrder[image.file.name] = image.order;
      } else {
        imagesOrder[image.filename] = image.order;
      }
    });
    formData.append("imagesOrder", JSON.stringify(imagesOrder));

    savePackage.mutate(formData, {
      onSuccess: () => {
        refreshData();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handleCloseModal = (refresh = false) => {
    setShowModal(false);
    if (refresh) {
      refreshData();
    }
  };

  return {
    showModal,
    itemToEdit,
    packageList,
    loading,
    error,
    setSearch,
    setPage,
    setShowModal,
    setItemToEdit,
    handleEditPackage,
    handleCloseModal,
    handleSort,
    togglePackageStatus,
  };
};
