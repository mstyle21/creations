import { Container } from "react-bootstrap";
import PageBanner from "./PageBanner";

const Error = () => {
  return (
    <>
      <PageBanner pageTitle="" />
      <Container>
        <div className="alert alert-danger">Something went wrong.</div>
      </Container>
    </>
  );
};

export default Error;
