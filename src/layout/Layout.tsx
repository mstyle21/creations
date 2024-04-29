import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { useAuthContext } from "../context/AuthContext";
import { USER_MENU_ITEMS, ADMIN_MENU_ITEMS } from "../routes";
import { ScrollRestoration } from "react-router-dom";
import AddOrder from "../features/admin-orders/components/AddOrder";
import { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const Layout = () => {
  const { user } = useAuthContext();
  const menuItems = user?.role === "admin" ? ADMIN_MENU_ITEMS : USER_MENU_ITEMS;

  return (
    <>
      <Header menuItems={menuItems} />
      <main className={user?.role === "admin" ? "admin-main" : ""}>
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
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
