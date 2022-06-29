import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import SingleProduct from "./singleProduct";
import Cart from "./cart";
import Login from "./login";
import Register from "./register";
import Account from "./account";
import Admin from "./admin/admin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/productId" element={<SingleProduct />} />
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
