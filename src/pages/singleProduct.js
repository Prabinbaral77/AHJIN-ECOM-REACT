import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ReactImageZoom from "react-image-zoom";
import Footer from "../components/Footer";
import StarRatings from "react-star-ratings";
import axios from "axios";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { useParams } from "react-router-dom";
import { setCartProduct } from "../redux/products/action";
import { useDispatch } from "react-redux";

function SingleProduct() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [image, setImage] = useState("");
  const [quantityInput, setquantityInput] = useState(1);
  const [category] = useState("kids");
  const [tobeseencatgeory, settobeseencatgeory] = useState("");
  const [selectedColor, setSelectedColor] = useState("red");
  const [cartData, setCartData] = useState([]);
  const { id } = useParams();
  console.log(cartData);
  const fetchProduct = async () => {
    axios
      .get(`http://0.0.0.0:8000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setImage(res.data.image);
      })
      .catch((error) => {
        console.log(error.response?.data);
      });
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const addToCartHandler = () => {
    // dispatch(setCartProduct(product, quantityInput));
    setCartData((prevData) => [
      ...prevData,
      { product: product, quantity: quantityInput },
    ]);
  };

  useEffect(() => {
    // eslint-disable-next-line
    switch (category) {
      case "kids":
        settobeseencatgeory("kids");
        break;
      case "mens":
        settobeseencatgeory("mens");
        break;
      case "makeup":
        settobeseencatgeory("makeup");
        break;
      case "laptops":
        settobeseencatgeory("laptops");
        break;
    }
  }, [category]);

  const handleQuantityIncrease = () => {
    if (quantityInput === 20) {
      setquantityInput(quantityInput);
    } else {
      setquantityInput(quantityInput + 1);
    }
  };
  const handleQuantityDecrease = () => {
    if (quantityInput === 1) {
      setquantityInput(quantityInput);
    } else {
      setquantityInput(quantityInput - 1);
    }
  };

  return (
    <div className="bg-gray-800 select-none">
      <Navbar />

      <main className="h-auto md:max-w-6xl w-[90%] mx-auto flex flex-col justify-center lg:grid gap-6 grid-cols-11 md:py-12 pb-20">
        <section className="w-full md:h-screen h-[60vh]  col-span-5 flex flex-col space-y-5  ">
          <div className="lg:min-h-[70%] min-h-[65%]  w-full relative">
            <img
              src={
                image
                  ? image
                  : "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
              layout="fill"
              className="object-cover"
              alt="productImage"
            />

            {/* <ReactImageZoom  width = "500" ZoomPosition="right"  ZoomScale = {50}  height = "630" zoomWidth = '700' img=  "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="z-50" /> */}
          </div>

          <div className="w-full grid md:grid-cols-4 grid-cols-3 gap-x-6 md:gap-x-2 gap-y-4 overflow-scroll md:min-h-[20%] min-h-[20%] scrollbar-hide">
            <div
              onClick={() => setImage(product?.image)}
              className="w-28 h-20 relative cursor-pointer"
            >
              <img
                src={
                  image
                    ? image
                    : "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                layout="fill"
                className="object-cover"
                alt="productImage"
              />
            </div>
            <div
              onClick={() => setImage(product?.image2)}
              className="w-28 h-20 relative cursor-pointer"
            >
              <img
                src={
                  image
                    ? image
                    : "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                layout="fill"
                className="object-cover"
                alt="productImage"
              />
            </div>
            <div
              onClick={() => setImage(product?.image3)}
              className="w-28 h-20 relative cursor-pointer"
            >
              <img
                src={
                  image
                    ? image
                    : "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                layout="fill"
                className="object-cover"
                alt="productImage"
              />
            </div>
          </div>
        </section>

        <section className="col-span-6 bg-gray-700 h-auto px-3 py-6 flex flex-col  justify-evenly space-y-6">
          <h1 className="tracking-wider text-xl font-bold text-gray-100 ">
            {product?.name}
          </h1>
          <div className="flex items-center space-x-3  text-gray-100 text-xs">
            <StarRatings
              rating={4.5}
              starRatedColor="goldenrod"
              readonly={true}
              starDimension="15px"
              starSpacing="2px"
            />
            <p className="text-gray-400"> (102) Review</p>
          </div>
          <div className="flex items-center space-x-3">
            <p className="text-orange-600 font-bold text-xl tracking-wider">
              Rs. {product?.price_m - product?.discount}
            </p>
            <p className="text-gray-400 line-through text-sm">
              Rs. {product?.price_m}
            </p>
          </div>
          <p className="text-gray-300 text-sm ">{product?.description}</p>
          {/* //!category anusar change hune thau */}
          <div className="flex flex-col justify-center space-y-3">
            <h1 className="text-lg font-bold text-gray-100">
              Available Options
            </h1>

            <main className="flex flex-col md:flex-row md:items-center md:justify-between px-3 space-y-4 ">
              <div className="flex flex-col space-y-2">
                <h1 className="text-gray-100 text-sm">Color</h1>
                <div className="flex items-center space-x-2">
                  <p
                    onClick={() => {
                      setSelectedColor("red");
                    }}
                    className={`bg-red-600 cursor-pointer h-8 w-8 rounded-md ${
                      selectedColor == "red" ? "border-2 border-white" : null
                    }`}
                  ></p>
                  <p
                    onClick={() => {
                      setSelectedColor("blue");
                    }}
                    className={`bg-blue-600 cursor-pointer h-8 w-8 rounded-md ${
                      selectedColor == "blue" ? "border-2 border-white" : null
                    }`}
                  ></p>
                  <p
                    onClick={() => {
                      setSelectedColor("green");
                    }}
                    className={`bg-green-600 cursor-pointer h-8 w-8 rounded-md ${
                      selectedColor == "green" ? "border-2 border-white" : null
                    }`}
                  ></p>
                  <p
                    onClick={() => {
                      setSelectedColor("yellow");
                    }}
                    className={`bg-yellow-600 cursor-pointer h-8 w-8 rounded-md ${
                      selectedColor == "yellow" ? "border-2 border-white" : null
                    }`}
                  ></p>
                </div>
              </div>
              {/* //todo: This should be dynamic according to the category */}
              {tobeseencatgeory === "kids" && (
                <div className="flex flex-col space-y-2">
                  <h1 className="text-gray-100 text-sm">Size</h1>
                  <div className="flex space-x-2">
                    <p className="bg-gray-600 cursor-pointer hover:bg-gray-500 transition-colors h-8 w-10 text-gray-100 text-center pt-1 ">
                      S
                    </p>
                    <p className="bg-gray-600 h-8 w-10 text-gray-100 text-center pt-1">
                      M
                    </p>
                    <p className="bg-gray-600 h-8 w-10 text-gray-100 text-center pt-1">
                      L
                    </p>
                    <p className="bg-gray-600 h-8 w-10 text-gray-100 text-center pt-1">
                      XL
                    </p>
                    <p className="bg-gray-600 h-8 w-10 text-gray-100 text-center pt-1 ">
                      XXL
                    </p>
                  </div>
                </div>
              )}
              {tobeseencatgeory === "makeup" && <h1>makeup</h1>}
              {tobeseencatgeory === "laptops" && <div>sdfsdf</div>}
            </main>
          </div>
          {/* //!Quantity Section */}

          <div className="flex items-center justify-between mt-5">
            <div className="flex flex-col mx-3 space-y-2">
              <h1 className="text-gray-100 text-sm">Quantity:</h1>
              <div className="flex">
                <p
                  onClick={handleQuantityDecrease}
                  className="bg-gray-600 cursor-pointer h-8 w-10 text-gray-100 text-center pt-1 text-sm"
                >
                  -
                </p>

                <label className="text-gray-100 bg-gray-800  w-12 h-8 text-center pt-1">
                  {quantityInput}
                </label>
                <p
                  onClick={handleQuantityIncrease}
                  className="bg-gray-600 h-8 cursor-pointer  w-10 text-gray-100 text-center pt-1 text-sm"
                >
                  +
                </p>
              </div>
            </div>
            <button
              className="border disabled:cursor-not-allowed  border-red-600 text-red-600 font-bold text-sm px-8 py-2 cursor-pointer hover:text-red-500 transition-all active:scale-90 duration-300 ease-in-out md:mr-3 mt-6"
              onClick={addToCartHandler}
            >
              Add To Cart
            </button>
          </div>
          <p className="text-sm text-red-600 mx-3">Not available in stock</p>
        </section>
      </main>
      <h1 className="max-w-6xl mx-auto text-xl px-4 lg:px-0 text-gray-100 underline my-4">
        View Product
      </h1>
      {/* //! Image zoom section */}
      <div className="hidden lg:flex space-x-3 h-auto max-w-6xl  cursor-auto items-center justify-start mx-auto">
        <ReactImageZoom
          width={500}
          ZoomPosition="right"
          ZoomScale={100}
          height={400}
          offset={{ vertical: 1, horizontal: 1 }}
          zoomWidth={652}
          img={
            image
              ? image
              : "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          className="z-50"
        />
      </div>
      {/* //!specs section */}
      <div className="my-6  px-4 lg:px-0 max-w-6xl mx-auto flex flex-col space-y-4 ">
        <h1 className="text-gray-100 text-xl font-semibold underline ">
          About this item
        </h1>

        <ol className="text-sm w-full flex flex-col space-y-2">
          <li className="hover:text-gray-100 cursor-auto">
            Quick access to Siri by saying “ Hey Siri ”
          </li>
          <li className="hover:text-gray-100 cursor-auto">
            More than 24 hours total listening time with the Charging Case
          </li>
          <li className="hover:text-gray-100 cursor-auto">
            Effortless setup, in-ear detection, and automatic switching for a
            magical experience
          </li>
          <li className="hover:text-gray-100 cursor-auto">
            Easily share audio between two sets of AirPods on your iPhone, iPad,
            iPod touch, or Apple TV
          </li>
        </ol>
      </div>
      {/* //todo: add reviews section */}
      <Footer />
      <ToastsContainer store={ToastsStore} />
    </div>
  );
}

export default SingleProduct;
