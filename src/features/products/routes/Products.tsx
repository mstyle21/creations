import { Container } from "react-bootstrap";
import PageBanner from "../../../components/PageBanner";
import ProductList from "../components/ProductList";
import ProductContextProvider from "../context/ProductContextProvider";

const Products = () => {
  return (
    <>
      <PageBanner pageTitle="Products" />
      <Container>
        <ProductContextProvider>
          <ProductList />
        </ProductContextProvider>
      </Container>
    </>
  );
};

export default Products;
