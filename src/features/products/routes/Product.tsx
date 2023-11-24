import PageBanner from "../../../components/PageBanner";
import ProductList from "../components/ProductList";
import ProductContextProvider from "../context/ProductContextProvider";

const Product = () => {
  return (
    <>
      <PageBanner pageTitle="Products" />
      <ProductContextProvider>
        <ProductList />
      </ProductContextProvider>
    </>
  );
};

export default Product;
