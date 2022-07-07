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

import Home1 from '../images/home1.jpeg'
import Home2 from '../images/home2.webp'
import Home3 from '../images/home3.jpeg'

function Home({products}) {
  return (
    <div>
      
      <Navbar />
      <Slider img1 = {Home1} img2 = {Home2} img3 = {Home3} />
      <NewProducts products = {products} />
      <FeaturedProducts products = {products} />
      <Categories />
      <Products  products = {products} />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
