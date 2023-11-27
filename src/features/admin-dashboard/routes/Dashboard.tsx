import { Container } from "react-bootstrap";
import PageBanner from "../../../components/PageBanner";
import StockStatistics from "../components/StockStatistics";

const Dashboard = () => {
  return (
    <>
      <PageBanner pageTitle="Admin dashboard" admin />
      <Container>
        <StockStatistics />
      </Container>
    </>
  );
};

export default Dashboard;
