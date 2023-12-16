import { Container } from "react-bootstrap";
import PageBanner from "../../../components/PageBanner";
import PackageList from "../components/PackageList";
import { Navigate } from "react-router-dom";
import { routesConfig } from "../../../routes";

const Packages = () => {
  return <Navigate to={routesConfig.products} />;
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
