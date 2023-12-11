import { Container } from "react-bootstrap";
import PageBanner from "../../../components/PageBanner";
import PackageList from "../components/PackageList";

const Packages = () => {
  return (
    <>
      <PageBanner pageTitle="Packages" />
      <Container>
        <PackageList />
      </Container>
    </>
  );
};

export default Packages;
