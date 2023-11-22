import { Container } from "react-bootstrap";
import PageBanner from "../../../components/PageBanner";
import ProductList from "../components/ProductList";

const ManageProduct = () => {
  return (
    <>
      <PageBanner pageTitle="Manage products" admin />
      <Container>
        <ProductList />
      </Container>
    </>
  );
};

export default ManageProduct;
