import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { USER_MENU_ITEMS, ADMIN_MENU_ITEMS } from "../routes";
import { ScrollRestoration } from "react-router-dom";
import AddOrder from "../features/admin-orders/components/AddOrder";

const Layout = () => {
  const { user } = useContext(AuthContext);
  const menuItems = user?.role === "admin" ? ADMIN_MENU_ITEMS : USER_MENU_ITEMS;

  return (
    <>
      <Header menuItems={menuItems} />
      <main className={user?.role === "admin" ? "admin-main" : ""}>
        <Outlet />
      </main>
      {user?.role === "admin" && <AddOrder />}
      {user?.role !== "admin" && <Footer menuItems={menuItems} />}
      <ScrollRestoration
        getKey={(location) => {
          //this prevents browser scroll up when updating link with setQueryParams
          if (location.search.length !== 0) {
            return location.pathname;
          }

          return location.key;
        }}
      />
    </>
  );
};

export default Layout;
