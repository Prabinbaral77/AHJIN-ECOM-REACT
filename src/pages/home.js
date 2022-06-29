import axios from "axios";
import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewProducts from "../components/NewProducts";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async() => {
      const res =  await axios.get("http://localhost:8000/api/products/")
     setProducts(res.data)
    }
    getProducts()
  }, [])
  return (
    <div>
      <Navbar />
      <Slider />
      <NewProducts products = {products} />
      <FeaturedProducts products = {products} />
      <Categories />
      <Products  products = {products} />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
