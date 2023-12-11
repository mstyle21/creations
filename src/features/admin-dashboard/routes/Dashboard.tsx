import { Container } from "react-bootstrap";
import PageBanner from "../../../components/PageBanner";
import ProductStockStatistics from "../components/ProductStockStatistics";
import PackageStockStatistics from "../components/PackageStockStatistics";

const Dashboard = () => {
  return (
    <>
      <PageBanner pageTitle="Admin dashboard" admin />
      <Container className="d-flex flex-column gap-5 mb-5">
        <ProductStockStatistics />
        <PackageStockStatistics />
      </Container>
    </>
  );
};

export default Dashboard;
