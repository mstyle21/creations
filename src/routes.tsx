import { RouteObject } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Package from "./pages/Package";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ManageCategory from "./pages/ManageCategory";
import ManageProduct from "./pages/ManageProduct";
import ManagePackage from "./pages/ManagePackage";
import Dashboard from "./pages/Dashboard";

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
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-categories",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageCategory />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-packages",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManagePackage />
          </ProtectedRoute>
        ),
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
