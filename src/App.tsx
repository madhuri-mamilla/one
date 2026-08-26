import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { Nav } from "./components/Nav";
import { Login } from "./pages/Login";
import { Feed } from "./pages/Feed";
import { RecipeDetail } from "./pages/RecipeDetail";
import { Favorites } from "./pages/Favorites";
import { trackPageView } from "./lib/analytics";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function usePageViewTracking() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
}

function App() {
  usePageViewTracking();

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <RequireAuth>
              <FavoritesProvider>
                <Nav />
                <Routes>
                  <Route path="/" element={<Feed />} />
                  <Route path="/recipe/:id" element={<RecipeDetail />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </FavoritesProvider>
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
