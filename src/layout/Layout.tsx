import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const USER_MENU_ITEMS = [
  { path: "/", name: "Home" },
  { path: "/products", name: "Products" },
  { path: "/packages", name: "Packages" },
  { path: "/contact", name: "Contact" },
];
const ADMIN_MENU_ITEMS = [
  { path: "/dashboard", name: "Dashboard" },
  { path: "/manage-categories", name: "Categories" },
  { path: "/manage-products", name: "Products" },
  { path: "/manage-packages", name: "Packages" },
];

const Layout = () => {
  const { user } = useContext(AuthContext);
  const menuItems = user?.role !== "admin" ? USER_MENU_ITEMS : ADMIN_MENU_ITEMS;

  return (
    <>
      <Header menuItems={menuItems} />
      <main>
        <Outlet />
      </main>
      {user?.role !== "admin" && <Footer />}
    </>
  );
};

export default Layout;
