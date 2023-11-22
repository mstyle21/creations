import { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import { BrowserRouter } from "react-router-dom";

type AppProvidersProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const AppProviders = ({ children }: AppProvidersProps) => {
  const { user, loginRedirect, login, logout } = useAuth();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ user, loginRedirect, login, logout }}>
          <BrowserRouter>{children}</BrowserRouter>
        </AuthContext.Provider>
      </QueryClientProvider>
    </Suspense>
  );
};

export default AppProviders;
