import { RouteObject } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../features/home/routes/Home";
import Products from "../features/products/routes/Products";
import Package from "../features/packages/routes/Package";
import Contact from "../features/contact/routes/Contact";
import Login from "../features/auth/routes/Login";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Categories from "../features/admin-categories/routes/Categories";
import ManageProduct from "../features/admin-products/routes/Products";
import ManagePackage from "../features/admin-packages/routes/Packages";
import Dashboard from "../features/admin-dashboard/routes/Dashboard";
import Product from "../features/products/routes/Product";
import { productDetailsLoader } from "../features/products/loaders/productDetailsLoader";

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
        element: <Products />,
      },
      {
        path: "product/:productSlug",
        element: <Product />,
        loader: productDetailsLoader,
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
            <Categories />
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
