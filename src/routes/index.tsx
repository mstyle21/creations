import { RouteObject } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../features/home/routes/Home";
import Products from "../features/products/routes/Products";
import Packages from "../features/packages/routes/Packages";
import Contact from "../features/contact/routes/Contact";
import Login from "../features/auth/routes/Login";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Categories from "../features/admin-categories/routes/Categories";
import ManageProduct from "../features/admin-products/routes/Products";
import ManagePackage from "../features/admin-packages/routes/Packages";
import Dashboard from "../features/admin-dashboard/routes/Dashboard";
import Product from "../features/products/routes/Product";
import { productDetailsLoader } from "../features/products/loaders/productDetailsLoader";
import Package from "../features/packages/routes/Package";
import { packageDetailsLoader } from "../features/packages/loaders/packageDetailsLoader";
import Error from "../components/Error";

const routes: RouteObject[] = [
  {
    id: "root",
    path: "/",
    element: <Layout />,
    errorElement: <>Something went wrong!</>,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "products",
        element: <Products />,
        errorElement: <Error />,
      },
      {
        path: "product/:productSlug",
        element: <Product />,
        loader: productDetailsLoader,
        errorElement: <Error />,
      },
      {
        path: "packages",
        element: <Packages />,
        errorElement: <Error />,
      },
      {
        path: "package/:packageSlug",
        element: <Package />,
        loader: packageDetailsLoader,
        errorElement: <Error />,
      },
      {
        path: "contact",
        element: <Contact />,
        errorElement: <Error />,
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <Error />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "manage-categories",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <Categories />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "manage-products",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageProduct />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "manage-packages",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManagePackage />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
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
