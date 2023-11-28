import { Container } from "react-bootstrap";
import Features from "../components/Features";
import LatestProducts from "../components/LatestProducts";
import NewsBanner from "../components/NewsBanner";

const Home = () => {
  return (
    <>
      <NewsBanner />
      <Container>
        <Features />
        <LatestProducts />
      </Container>
    </>
  );
};

export default Home;
