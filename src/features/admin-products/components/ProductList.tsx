import { capitalize } from "lodash";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import SearchFilter from "../../../components/filters/Search";
import { BACKEND_URL, CURRENCY_SIGN, THUMBNAIL_PREFIX } from "../../../config";
import { useFilters } from "../../../hooks/useFilters";
import { ProductDetails } from "../../../types";
import ProductModal from "./ProductModal";
import { DEFAULT_IMAGE, stockColor } from "../../../utils";
import { useGetProducts } from "../../../api/products/getProducts";
import { useGetAllCategories } from "../../../api/categories/getAllCategories";
import ReactSelect from "react-select";
import LoadingSpinner from "../../../components/LoadingSpinner";

const sortOptions = [
  { label: "Nume", value: "name" },
  { label: "Stoc", value: "stock" },
  { label: "Pret", value: "price" },
];

const ProductList = () => {
  const [showModal, setShowModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<ProductDetails | null>(null);
  const { page, filters, setPage, setSearch, handleSort } = useFilters(8 * 4);
  const [productList, setProductList] = useState<ProductDetails[]>([]);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const { products, pages, error, loading, refreshData } = useGetProducts({ filters });
  const { categoryList } = useGetAllCategories({});

  let categoryOptions: { label: string; value: number }[] = [];

  if (categoryList && categoryList.length > 0) {
    categoryOptions = categoryList.map((category) => ({ label: category.name, value: category.id }));
  }
  categoryOptions = [];

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

  const handleCloseModal = (refresh = false) => {
    setShowModal(false);
    if (refresh) {
      refreshData();
    }
  };

  const handleEditProduct = (product: ProductDetails) => {
    setShowModal(true);

    product.images = product.images.map((image) => {
      return { ...image, productId: product.id };
    });

    setItemToEdit(product);
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
                  onDoubleClick={() => {
                    handleEditProduct({ ...product });
                  }}
                >
                  <div className="position-relative">
                    <img className="admin-product-image" src={imgSrc} />
                    <span className="admin-product-status" style={{ backgroundColor: product.status === "active" ? "green" : "red" }}>
                      {capitalize(product.status)}
                    </span>
                    <span className="admin-product-price">
                      {product.price / 100} {CURRENCY_SIGN}
                    </span>
                  </div>

                  <strong className="admin-product-name">
                    {product.name}
                    <span style={{ color: stockColor(product.stock), fontWeight: "bold" }}>({product.stock})</span>
                  </strong>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ProductModal show={showModal} closeModal={handleCloseModal} itemToEdit={itemToEdit} />
    </>
  );
};

export default ProductList;
