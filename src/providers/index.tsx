import { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "../routes/routes";

const queryClient = new QueryClient();

const router = createBrowserRouter(routes);

const AppProviders = () => {
  const { user, loginRedirect, login, logout } = useAuth();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ user, loginRedirect, login, logout }}>
          <RouterProvider router={router}></RouterProvider>
          {/* <BrowserRouter></BrowserRouter> */}
        </AuthContext.Provider>
      </QueryClientProvider>
    </Suspense>
  );
};

export default AppProviders;
