import { Container } from "react-bootstrap";
import PageBanner from "../../../components/PageBanner";
import CategoryList from "../components/CategoryList";

const Categories = () => {
  return (
    <>
      <PageBanner pageTitle="Manage categories" admin />
      <Container>
        <CategoryList />
      </Container>
    </>
  );
};

export default Categories;
