import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import routes from "./routes";

const queryClient = new QueryClient();

const router = createBrowserRouter(routes);

const App = () => {
  const { user, loginRedirect, login, logout } = useAuth();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ user, loginRedirect, login, logout }}>
          <RouterProvider router={router}></RouterProvider>
        </AuthContext.Provider>
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
