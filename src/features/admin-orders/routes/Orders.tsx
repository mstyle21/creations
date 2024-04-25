import { Container } from "react-bootstrap";
import PageBanner from "../../../components/PageBanner";
import OrderList from "../components/OrderList";

const Orders = () => {
  return (
    <>
      <PageBanner pageTitle="Manage orders" admin />
      <Container>
        <OrderList />
      </Container>
    </>
  );
};

export default Orders;
