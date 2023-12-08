import { Container } from "react-bootstrap";
import PageBanner from "../../../components/PageBanner";
import PackageList from "../components/PackageList";

const ManagePackage = () => {
  return (
    <>
      <PageBanner pageTitle="Manage packages" admin />
      <Container>
        <PackageList />
      </Container>
    </>
  );
};

export default ManagePackage;
