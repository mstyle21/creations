import { RouteObject } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Package from "./pages/Package";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

const routes: RouteObject[] = [
  {
    id: "root",
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "packages",
        element: <Package />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute allowedRoles={["admin"]}></ProtectedRoute>,
      },
      {
        path: "*",
        Component: () => {
          return <>404</>;
        },
      },
    ],
  },
];

export default routes;
