import { Button, Col, Container, Form, Row } from "react-bootstrap";
import PageBanner from "../components/PageBanner";
import { capitalize } from "../utils";
import { useState } from "react";
import ManageCategoryModal from "../features/ManageCategoryModal";
import useAxios from "../hooks/useAxios";
import LoadingSpinner from "../components/LoadingSpinner";
import Paginator from "../components/Paginator";
import PaginatorInfo from "../components/PaginatorInfo";

export type CategoryDetails = {
  id: number;
  name: string;
  status: "active" | "inactive";
};
type ApiCategoryResponse = {
  items: CategoryDetails[];
  count: number;
  pages: number;
};

const ManageCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<CategoryDetails | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, error, loading, refreshData } = useAxios<ApiCategoryResponse>({
    url: `/api/categories?page=${page}&perPage=${perPage}`,
    method: "get",
  });
  const count = data?.count ?? 0;
  const categories = data?.items ?? [];
  const pages = data?.pages ?? 1;

  const handleCloseModal = (refresh = false) => {
    setShowModal(false);
    if (refresh) {
      refreshData();
    }
  };

  return (
    <>
      <PageBanner pageTitle="Manage categories" admin />
      <Container>
        <Row>
          <div className="table-responsive" style={{ minHeight: "200px" }}>
            <Row className="table-toolbar justify-content-between">
              <Col md={1}>
                <Form.Select onChange={(e) => setPerPage(parseInt(e.target.value))}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </Form.Select>
              </Col>
              <Col md={5} className="d-flex justify-content-between">
                <Col md={7}>
                  <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  ></Form.Control>
                </Col>
                <Col md={4}>
                  <Button
                    className="btn-success form-control"
                    onClick={() => {
                      setItemToEdit(null);
                      setShowModal(true);
                    }}
                  >
                    Add new category
                  </Button>
                </Col>
              </Col>
            </Row>
            <Row className="position-relative">
              <Col md={12}>
                {loading && <LoadingSpinner />}
                {!loading && error && <p className="alert alert-danger text-center">Something went wrong!</p>}
                {!loading && !error && categories.length === 0 && <p className="text-center">No categories found!</p>}
                {categories.length > 0 && (
                  <>
                    <div className="results-table">
                      <div className="table-head">
                        <span>ID</span>
                        <span>Name</span>
                        <span>Products</span>
                        <span>Packages</span>
                        <span>Status</span>
                        <span>Actions</span>
                      </div>

                      {categories.map((category) => {
                        return (
                          <div className="table-row" key={category.id}>
                            <span>{category.id}</span>
                            <span>{category.name}</span>
                            <span>0</span>
                            <span>0</span>
                            <span style={{ fontWeight: "bold", color: category.status === "active" ? "green" : "red" }}>
                              {capitalize(category.status)}
                            </span>
                            <span>
                              <Button
                                onClick={() => {
                                  setItemToEdit(category);
                                  setShowModal(true);
                                }}
                              >
                                Edit
                              </Button>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <Row className="table-pagination align-items-center">
                      <Col md={6} sm={12}>
                        <PaginatorInfo page={page} perPage={perPage} count={count} />
                      </Col>
                      <Col md={6} sm={12} className="d-flex justify-content-end">
                        <Paginator currentPage={page} pages={pages} handleClick={setPage} />
                      </Col>
                    </Row>
                  </>
                )}
              </Col>
            </Row>
          </div>
        </Row>
      </Container>
      <ManageCategoryModal show={showModal} closeModal={handleCloseModal} itemToEdit={itemToEdit} />
    </>
  );
};

export default ManageCategory;
