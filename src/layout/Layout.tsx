import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { USER_MENU_ITEMS, ADMIN_MENU_ITEMS } from "../routes";
import { ScrollRestoration } from "react-router-dom";

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
