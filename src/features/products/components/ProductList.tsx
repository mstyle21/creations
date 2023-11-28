import { Col, Row } from "react-bootstrap";
import ActionToolbar from "./ActionToolbar";
import Filters from "./Filters";
import List from "./List";

const ProductList = () => {
  return (
    <div className="product-list-container">
      <Row>
        <Col xl={3} lg={4} md={5}>
          <Filters />
        </Col>
        <Col xl={9} lg={8} md={7}>
          <ActionToolbar />
          <List />
        </Col>
      </Row>
    </div>
  );
};

export default ProductList;
