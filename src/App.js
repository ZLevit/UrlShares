import "./styles/dark.scss";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./models/Inputs";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import EntityPage from "./pages/EntityPage";
import InputPage from "./pages/InputPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<LoginPage />} />
            <Route
              index
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <UsersPage />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <EntityPage />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <InputPage inputs={userInputs} title="Add New User" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={
                  <RequireAuth>
                    <ProductsPage />
                  </RequireAuth>
                }
              />
              <Route
                path=":productId"
                element={
                  <RequireAuth>
                    <EntityPage />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <InputPage inputs={productInputs} title="Add New Product" />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
