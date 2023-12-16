import { RouteObject } from "react-router-dom";
import Layout from "../layout/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { productDetailsLoader } from "../features/products/loaders/productDetailsLoader";
import { packageDetailsLoader } from "../features/packages/loaders/packageDetailsLoader";
import { lazy } from "react";

const Home = lazy(() => import("../features/home/routes/Home"));
const Products = lazy(() => import("../features/products/routes/Products"));
const Product = lazy(() => import("../features/products/routes/Product"));
// const Packages = lazy(() => import("../features/packages/routes/Packages"));
const Package = lazy(() => import("../features/packages/routes/Package"));
const Contact = lazy(() => import("../features/contact/routes/Contact"));
const Login = lazy(() => import("../features/auth/routes/Login"));

const Dashboard = lazy(() => import("../features/admin-dashboard/routes/Dashboard"));
const Categories = lazy(() => import("../features/admin-categories/routes/Categories"));
const ManageProduct = lazy(() => import("../features/admin-products/routes/Products"));
const ManagePackage = lazy(() => import("../features/admin-packages/routes/Packages"));

const Error = lazy(() => import("../components/Error"));

export const routesConfig = {
  home: "/",
  products: "/figurine",
  product: "/figurine",
  packages: "/figurine-set",
  package: "/figurine-set",
  contact: "/contact",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  dashboard: "/dashboard",
  manageCategories: "/manage-categories",
  manageProducts: "/manage-products",
  managePackages: "/manage-packages",
};

export const USER_MENU_ITEMS = [
  { path: routesConfig.home, name: "Acasa" },
  { path: routesConfig.products, name: "Figurine" },
  // { path: routesConfig.packages, name: "Packages" },
  { path: routesConfig.contact, name: "Contact" },
];
export const ADMIN_MENU_ITEMS = [
  { path: routesConfig.dashboard, name: "Dashboard" },
  { path: routesConfig.manageCategories, name: "Categories" },
  { path: routesConfig.manageProducts, name: "Products" },
  { path: routesConfig.managePackages, name: "Packages" },
];

const routes: RouteObject[] = [
  {
    id: "root",
    path: routesConfig.home,
    element: <Layout />,
    errorElement: <>Something went wrong!</>,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: routesConfig.products,
        element: <Products />,
        errorElement: <Error />,
      },
      {
        path: `${routesConfig.product}/:productSlug`,
        element: <Product />,
        loader: productDetailsLoader,
        errorElement: <Error />,
      },
      // {
      //   path: routesConfig.packages,
      //   element: <Packages />,
      //   errorElement: <Error />,
      // },
      {
        path: `${routesConfig.package}/:packageSlug`,
        element: <Package />,
        loader: packageDetailsLoader,
        errorElement: <Error />,
      },
      {
        path: routesConfig.contact,
        element: <Contact />,
        errorElement: <Error />,
      },
      {
        path: routesConfig.login,
        element: <Login />,
        errorElement: <Error />,
      },
      {
        path: routesConfig.dashboard,
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: routesConfig.manageCategories,
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <Categories />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: routesConfig.manageProducts,
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageProduct />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: routesConfig.managePackages,
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
