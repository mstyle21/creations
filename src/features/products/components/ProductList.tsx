import { Col, Row } from "react-bootstrap";
import ActionToolbar from "../../../components/ActionToolbar";
import ProductFilters from "../../../components/ProductFilters";
import List from "./List";
import { useCallback, useState } from "react";

const ProductList = () => {
  const [pages, setPages] = useState(0);

  const handleSetPages = useCallback((totalPages: number) => {
    setPages(totalPages);
  }, []);

  return (
    <div className="product-list-container">
      <Row>
        <Col lg={3} md={12}>
          <ProductFilters />
        </Col>
        <Col lg={9} md={12}>
          <ActionToolbar pages={pages} />
          <List setPages={handleSetPages} />
        </Col>
      </Row>
    </div>
  );
};

export default ProductList;
