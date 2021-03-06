import React, { useState, useEffect } from "react";
import Slider from "../../components/Slider";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { Fade } from "react-reveal";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";
import Ele1 from "../../images/electronics1.jpeg";
import Ele2 from "../../images/electronics2.webp";
import Ele3 from "../../images/electronics3.webp";

function Electronics() {
  const [products, setProducts] = useState([]);

  const [dCat, setdcat] = useState("");
  const [dCatProducts, setdCatProducts] = useState([]);
  const [arrival, setArrival] = useState("");

  const [price, setprice] = useState("");
  useEffect(() => {
    const getAllProducts = async () => {
      if (arrival === "oldest") {
        const res = await axios.get(
          `http://0.0.0.0:8000/api/products/?cat=E&new=False`
        );
        setProducts(res.data);
      } else {
        const res = await axios.get("http://0.0.0.0:8000/api/products/?cat=E");
        setProducts(res.data);
      }
    };
    getAllProducts();
  }, [arrival]);

  useEffect(() => {
    if ((dCat && arrival === "") || (dCat && arrival === "latest")) {
      const dCatProductsArr = products.filter((product) => {
        return product.d_cat === dCat;
      });
      setdCatProducts(dCatProductsArr);
    } else if (dCat && arrival === "oldest") {
      const dCatProductsArr = products.filter((product) => {
        return product.d_cat === dCat;
      });
      setdCatProducts(dCatProductsArr);
    }
  }, [dCat, products, price]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (price === "desc") {
      const newProducts = products.sort((a, b) => {
        return a.price_m - b.price_m;
      });
      setProducts(newProducts);
    } else if (price === "asc" || price === "") {
      const newProducts = products.sort((a, b) => {
        return b.price_m - a.price_m;
      });
      setProducts(newProducts);
    }
  }, [price, dCat]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="bg-gray-800 ">
      <Navbar />
      <Slider img1={Ele1} img2={Ele2} img3={Ele3} />

      <div className="h-auto bg-gray-800 px-4 py-2 flex flex-col space-y-3 mt-20 mb-10 max-w-6xl mx-auto">
        <h1 className="text-cyan-500 font-semibold text-xl underline">
          Filter Products
        </h1>
        <div className="flex items-center space-x-4 text-sm">
          <select
            onChange={(e) => setdcat(e.target.value)}
            name=""
            id=""
            className="bg-gray-700 outline-none text-gray-100 w-1/4 p-2"
          >
            <option value="">All</option>
            <option value="laptop">Laptop</option>
            <option value="smartphone">Smartphone</option>
            <option value="camera">Camera</option>
          </select>
          <select
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            name=""
            id=""
            className="bg-gray-700 outline-none text-gray-100 w-1/4 p-2"
          >
            <option value="">By Arrival</option>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
          <select
            value={price}
            onChange={(e) => setprice(e.target.value)}
            name=""
            id=""
            className="bg-gray-700 outline-none text-gray-100 w-1/4 p-2"
          >
            <option disabled value="">
              By Price
            </option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

      {!dCat && (
        <Fade bottom>
          <div className="grid grid-cols-4 max-w-6xl mx-auto gap-6 mb-10">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price_m={product?.price_m}
                price_a={product?.price_a}
                discount={product.discount}
                rating={product.rating}
                img={product.image}
              />
            ))}
          </div>
        </Fade>
      )}

      {dCat && (
        <Fade bottom>
          <div className="grid grid-cols-4 max-w-6xl mx-auto gap-6 mb-10">
            {dCatProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price_m={product?.price_m}
                price_a={product?.price_a}
                discount={product.discount}
                rating={product.rating}
                img={product.image}
              />
            ))}
          </div>
        </Fade>
      )}

      <Footer />
    </main>
  );
}

export default Electronics;
