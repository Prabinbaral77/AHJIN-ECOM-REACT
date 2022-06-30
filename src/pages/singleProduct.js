import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ReactImageZoom from "react-image-zoom";
import Footer from "../components/Footer";
import StarRatings from "react-star-ratings";
import axios from "axios";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { useParams } from "react-router-dom";
import { setCartProduct } from "../redux/products/action";
import { useDispatch, useSelector } from "react-redux";

function SingleProduct() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [displayImage, setdisplayImage] = useState("");
  const [quantityInput, setquantityInput] = useState(1);
  const [uniquefea, setuniquefea] = useState(null);

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
        setImage2(res.data.image2);
        setImage3(res.data.image3);
        setdisplayImage(res.data.image);
        setuniquefea(res.data.unique_feature[0]);
      })
      .catch((error) => {
        console.log(error.response?.data);
      });
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const addToCartHandler = () => {
    dispatch(setCartProduct(product, quantityInput));
  };

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
          <div className="h-[65%] bg-red-400  w-full relative">
            <img
              src={
                displayImage
                  ? displayImage
                  : "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
              layout="fill"
              className="object-cover h-full w-full"
              alt="productImage"
            />

            {/* <ReactImageZoom  width = "500" ZoomPosition="right"  ZoomScale = {50}  height = "630" zoomWidth = '700' img=  "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="z-50" /> */}
          </div>

          <div className="w-full grid md:grid-cols-4 grid-cols-3 gap-x-6 md:gap-x-2 gap-y-4 overflow-scroll md:min-h-[20%] min-h-[20%] scrollbar-hide">
            <div
              onClick={() => setdisplayImage(product?.image)}
              className="w-28 h-20  cursor-pointer"
            >
              <img
                src={
                  image
                    ? image
                    : "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                layout="fill"
                className="object-cover h-full w-full"
                alt="productImage"
              />
            </div>
            <div
              onClick={() => setdisplayImage(product?.image2)}
              className="w-28 h-20 cursor-pointer"
            >
              <img
                src={
                  image2
                    ? image2
                    : "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                layout="fill"
                className="object-cover h-full w-full"
                alt="productImage"
              />
            </div>
            <div
              onClick={() => setdisplayImage(product?.image3)}
              className="w-28 h-20  cursor-pointer"
            >
              <img
                src={
                  image3
                    ? image3
                    : "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                layout="fill"
                className="object-cover h-full w-full"
                alt="productImage"
              />
            </div>
          </div>
        </section>

        <section className="col-span-6 bg-gray-700 h-[600px] px-3 py-6 flex flex-col space-y-6">
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
              Rs.{" "}
              {uniquefea?.priceAdd
                ? product?.price_m +
                  parseInt(uniquefea?.priceAdd) -
                  product?.discount
                : product?.price_m - product?.discount}
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
                  {product?.cat === "C" &&
                    product?.unique_feature[0]?.available_colors?.map((m) => (
                      <p
                        onClick={() => {
                          setSelectedColor(m);
                        }}
                        style={{ backgroundColor: m }}
                        className={`cursor-pointer h-8 w-8 rounded-md ${
                          selectedColor == m ? "border-2 border-white" : null
                        }`}
                      ></p>
                    ))}
                  {product?.cat === "E" &&
                    uniquefea?.color?.map((m) => (
                      <p
                        onClick={() => {
                          setSelectedColor(m);
                        }}
                        style={{ backgroundColor: m }}
                        className={`cursor-pointer h-8 w-8 rounded-md ${
                          selectedColor == m ? "border-2 border-white" : null
                        }`}
                      ></p>
                    ))}
                </div>
              </div>
              {/* //todo: This should be dynamic according to the category */}

              {product?.cat === "C" && (
                <div className="flex flex-col space-y-2">
                  <h1 className="text-gray-100 text-sm">Size</h1>
                  <div className="flex space-x-2">
                    <p className="bg-gray-600 cursor-pointer hover:bg-gray-500 transition-colors h-8 w-10 text-gray-100 text-center pt-1 ">
                      S
                    </p>
                    <p className="bg-gray-600 cursor-pointer hover:bg-gray-500 transition-colors h-8 w-10 text-gray-100 text-center pt-1">
                      M
                    </p>
                    <p className="bg-gray-600 cursor-pointer hover:bg-gray-500 transition-colors h-8 w-10 text-gray-100 text-center pt-1">
                      L
                    </p>
                    <p className="bg-gray-600 cursor-pointer hover:bg-gray-500 transition-colors h-8 w-10 text-gray-100 text-center pt-1">
                      XL
                    </p>
                    <p className="bg-gray-600 cursor-pointer hover:bg-gray-500 transition-colors h-8 w-10 text-gray-100 text-center pt-1 ">
                      XXL
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                {product?.d_cat === "laptop" &&
                  product?.unique_feature.map((m, index) => (
                    <div
                      onClick={() =>
                        setuniquefea(product?.unique_feature[index])
                      }
                      className={`h-20  w-32 bg-gray-600 cursor-pointer  hover:opacity-80 text-cyan-200 px-3 py-2 space-y-3`}
                    >
                      <p>{m.RAM}GB RAM</p>
                      <p>{m.SSD} SSD</p>
                    </div>
                  ))}
              </div>
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
          height={500}
          offset={{ vertical: 1, horizontal: 1 }}
          zoomWidth={652}
          img={
            displayImage
              ? displayImage
              : "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          className="z-50 object-cover"
        />
      </div>

      {/* //todo: add reviews section */}
      <Footer />
      <ToastsContainer store={ToastsStore} />
    </div>
  );
}

export default SingleProduct;
