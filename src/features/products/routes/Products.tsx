import { Container } from "react-bootstrap";
import PageBanner from "../../../components/PageBanner";
import ProductList from "../components/ProductList";

const Products = () => {
  return (
    <>
      <PageBanner pageTitle="Figurine" />
      <Container>
        <ProductList />
      </Container>
    </>
  );
};

export default Products;
