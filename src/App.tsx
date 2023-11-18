import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import { useAuth } from "./hooks/useAuth";
import { AuthContext } from "./context/AuthContext";

const router = createBrowserRouter(routes);

function App() {
  const { user, loginRedirect, login, logout } = useAuth();

  return (
    <AuthContext.Provider value={{ user, loginRedirect, login, logout }}>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </AuthContext.Provider>
  );
}

export default App;
