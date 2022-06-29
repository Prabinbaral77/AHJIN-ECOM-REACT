import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SingleProduct from "./pages/singleProduct";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Register from "./pages/register";
import Account from "./pages/account";
import Admin from "./pages/admin/admin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/product/:id`} element={<SingleProduct />} />
        <Route path="/product/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
