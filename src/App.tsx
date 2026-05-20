import { BrowserRouter, Route, Routes } from "react-router-dom";
import GuestRoute from "./components/auth/GuestRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SellerAdminRoute from "./components/auth/SellerAdminRoute";
import HomeRedirect from "./components/layout/HomeRedirect";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProductCreate from "./pages/ProductCreate";
import ProductDetail from "./pages/ProductDetail";
import ProductEdit from "./pages/ProductEdit";
import Products from "./pages/Products";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/products" element={<Products />} />

        <Route element={<SellerAdminRoute />}>
          <Route path="/products/new" element={<ProductCreate />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
        </Route>

        <Route path="/products/:id" element={<ProductDetail />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<GuestRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
