import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SingleProduct from "./pages/singleProduct";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Register from "./pages/register";
import Account from "./pages/account";
import Admin from "./pages/admin/admin";
import Electronics from "./pages/categories/electronics";
import Clothes from "./pages/categories/clothes";
import { useEffect, useState } from "react";
import axios from "axios";
import AskEmail from "./pages/user/AskEmail";
import ChangePassword from "./pages/user/ChangePassword";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Others from "./pages/categories/Others";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("http://localhost:8000/api/products/");
      setProducts(res.data);
    };
    getProducts();
  }, []);

  return (
    <div className="bg-gray-800">
      <Toaster />
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path={`/product/:id`} element={<SingleProduct />} />
        <Route path="/product/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/categories/others" element={<Others />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route path="/categories/electronics" element={<Electronics />} />
        <Route path="/categories/clothes" element={<Clothes />} />
        <Route path="/user/enter-email" element={<AskEmail />} />
        <Route
          path="/user/change-password/:id/:token"
          element={<ChangePassword />}
        />
      </Routes>
    </div>
  );
}

export default App;
