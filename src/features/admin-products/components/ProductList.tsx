import { capitalize } from "lodash";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import SearchFilter from "../../../components/filters/Search";
import { BACKEND_URL, CURRENCY_SIGN, THUMBNAIL_PREFIX } from "../../../config";
import { useFilters } from "../../../hooks/useFilters";
import ProductModal from "./ProductModal";
import { DEFAULT_IMAGE, stockColor } from "../../../utils";
import { useGetProducts } from "../../../api/products/getProducts";
import { useGetAllCategories } from "../../../api/categories/getAllCategories";
import ReactSelect from "react-select";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useManageList } from "../hooks/useManageList";
import { useSaveProduct } from "../../../api/products/saveProduct";
import { ProductDetails } from "../../../types";
import PackageModal from "../../admin-packages/components/PackageModal";
import { useQuickPackage } from "../hooks/useQuickPackage";

const sortOptions = [
  { label: "Nume", value: "name" },
  { label: "Stoc", value: "stock" },
  { label: "Pret", value: "price" },
];

const ProductList = () => {
  const {
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
  } = useManageList();
  const { quickPackage, showQuickPackageModal, handleBoxClick, setShowQuickPackageModal, isProductSelected } = useQuickPackage();
  const { page, filters, setPage, setSearch, handleSort } = useFilters(8 * 4);
  const productFilters = { ...filters, categories };
  const { products, pages, error, loading, refreshData } = useGetProducts({ filters: productFilters });
  const { categoryList } = useGetAllCategories({});
  const saveProduct = useSaveProduct();

  let categoryOptions: { label: string; value: number }[] = [];
  if (categoryList && categoryList.length > 0) {
    categoryOptions = categoryList.map((category) => ({ label: category.name, value: category.id }));
  }

  useEffect(() => {
    if (!loading) {
      if (page > 1 && products.length > 0) {
        setProductList((prev) => [...prev, ...products]);
      }
      if (page === 1) {
        setProductList(products);
      }

      setHasMoreProducts(page !== pages);
    }

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

      if (!loading && hasMoreProducts && scrollTop + clientHeight >= scrollHeight - 20) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMoreProducts]);

  const toggleProductStatus = (product: ProductDetails) => {
    const formData = new FormData();

    formData.append("id", product.id.toString());
    formData.append("name", product.name);
    formData.append("width", product.width.toString());
    formData.append("height", product.height.toString());
    formData.append("depth", product.depth.toString());
    formData.append("stock", product.stock.toString());
    formData.append("materialWeight", (product.materialWeight ?? "").toString());
    formData.append("price", product.price.toString());
    formData.append("oldPrice", (product.oldPrice ?? "").toString());
    formData.append("status", product.status === "inactive" ? "active" : "inactive");

    product.categories.forEach((category) => {
      formData.append("categories", category.id.toString());
    });

    const imagesOrder: { [key: string]: number } = {};
    product.images.forEach((image) => {
      if (image.file !== undefined) {
        imagesOrder[image.file.name] = image.order;
      } else {
        imagesOrder[image.filename] = image.order;
      }
    });
    formData.append("imagesOrder", JSON.stringify(imagesOrder));

    saveProduct.mutate(formData, {
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

  return (
    <>
      {!loading && error && <p className="alert alert-danger text-center">Something went wrong!</p>}

      <div className="admin-toolbar">
        <SearchFilter onChange={setSearch} />
        <ReactSelect
          options={sortOptions}
          placeholder="Sort"
          onChange={(newValue) => {
            if (newValue) {
              handleSort(newValue.value);
              setPage(1);
            }
          }}
          styles={{
            container: (baseStyles) => ({
              ...baseStyles,
              width: "250px",
            }),
            indicatorSeparator: (baseStyles) => ({
              ...baseStyles,
              display: "none",
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              zIndex: 5,
            }),
          }}
        />
        {categoryOptions.length > 0 && (
          <ReactSelect
            isMulti
            options={categoryOptions}
            placeholder="Categories"
            closeMenuOnSelect={false}
            onChange={(newValues) => {
              if (newValues) {
                setCategories(newValues.map((item) => item.value));
              }
            }}
            styles={{
              container: (baseStyles) => ({
                ...baseStyles,
                width: "250px",
              }),
              indicatorSeparator: (baseStyles) => ({
                ...baseStyles,
                display: "none",
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                zIndex: 5,
              }),
            }}
          />
        )}
        <Button
          className="btn-success"
          onClick={() => {
            setItemToEdit(null);
            setShowModal(true);
          }}
        >
          Add new product
        </Button>
      </div>

      <div className="admin-product-list-container">
        {loading && <LoadingSpinner />}

        {productList.length > 0 && (
          <div className="admin-product-list">
            {productList.map((product) => {
              const imgSrc =
                product.images.length > 0
                  ? `${BACKEND_URL}/products/${product.id}/${THUMBNAIL_PREFIX}${product.images[0].filename}`
                  : DEFAULT_IMAGE;

              return (
                <div
                  className="admin-product-box"
                  key={product.id}
                  onClick={() => {
                    handleBoxClick(product);
                  }}
                  onDoubleClick={() => {
                    handleEditProduct({ ...product });
                  }}
                  style={isProductSelected(product) ? { filter: "drop-shadow(0 0 6px crimson)" } : {}}
                >
                  <div className="position-relative">
                    <img className="admin-product-image" src={imgSrc} />
                    <input
                      className="admin-product-quick-package-checkbox"
                      type="checkbox"
                      readOnly
                      checked={isProductSelected(product)}
                      value={product.id}
                    />
                    <span
                      className="admin-product-status"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleProductStatus(product);
                      }}
                      style={{ backgroundColor: product.status === "active" ? "green" : "red" }}
                    >
                      {capitalize(product.status)}
                    </span>
                    <span className="admin-product-price">
                      {product.price / 100} {CURRENCY_SIGN}
                    </span>
                  </div>

                  <strong className="admin-product-name">
                    {product.name}
                    <span style={{ color: stockColor(product.stock, product.production), fontWeight: "bold" }}>({product.stock})</span>
                  </strong>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <button
        className="prim-btn quick-package-btn"
        style={{ display: quickPackage.length > 0 ? "block" : "none" }}
        onClick={() => setShowQuickPackageModal(true)}
      >
        Create package
      </button>

      <PackageModal
        show={showQuickPackageModal}
        closeModal={() => setShowQuickPackageModal(false)}
        itemToEdit={null}
        presetItems={[...quickPackage]}
      />
      <ProductModal show={showModal} closeModal={handleCloseModal} itemToEdit={itemToEdit} />
    </>
  );
};

export default ProductList;
