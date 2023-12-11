import { RouteObject } from "react-router-dom";
import Layout from "../layout/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { productDetailsLoader } from "../features/products/loaders/productDetailsLoader";
import { packageDetailsLoader } from "../features/packages/loaders/packageDetailsLoader";
import { lazy } from "react";

const Home = lazy(() => import("../features/home/routes/Home"));
const Products = lazy(() => import("../features/products/routes/Products"));
const Product = lazy(() => import("../features/products/routes/Product"));
const Packages = lazy(() => import("../features/packages/routes/Packages"));
const Package = lazy(() => import("../features/packages/routes/Package"));
const Contact = lazy(() => import("../features/contact/routes/Contact"));
const Login = lazy(() => import("../features/auth/routes/Login"));

const Dashboard = lazy(() => import("../features/admin-dashboard/routes/Dashboard"));
const Categories = lazy(() => import("../features/admin-categories/routes/Categories"));
const ManageProduct = lazy(() => import("../features/admin-products/routes/Products"));
const ManagePackage = lazy(() => import("../features/admin-packages/routes/Packages"));

const Error = lazy(() => import("../components/Error"));

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
