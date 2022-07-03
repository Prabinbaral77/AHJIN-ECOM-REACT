import React, { useEffect, useState, useContext } from "react";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";
// import config from "../khalti/khalti.config";
import { AjhinContext } from "../context/ahjinContext";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { ahjinCoinCalculator } from "../utils/ahjinCoinCalculator";

function Cart() {
  const [orderItemArray, setOrderItemArray] = useState([]);
  const userDetail = JSON.parse(localStorage.getItem("userDetails"));
  const accessToken = userDetail?.access_token;
  const userId = userDetail?.user?.pk;
  const { currentAccount, tokenBalance, buyAssets, sendEthInReward } =
    useContext(AjhinContext);
  const cartProductDetails = useSelector((state) => state.products).cart;

  const totalPriceOfCart = () => {
    let price = 0;
    cartProductDetails.forEach(({ product, quantity }) => {
      price += (product.price_m - product.discount) * quantity;
    });
    return price;
  };

  const formatDataToOrder = async () => {
    cartProductDetails.forEach((singleProduct) => {
      setOrderItemArray((prevData) => [
        ...prevData,
        {
          productChosen: singleProduct?.uniquefeatureIndex,
          quantity: singleProduct?.quantity,
          paymentMethod: "K",
          delivered: false,
          product: singleProduct?.product?.id,
          user: userId,
        },
      ]);
    });
  };

  const dataTosend = [
    {
      productChosen: 1,
      quantity: 2,
      paymentMethod: "K",
      delivered: false,
      product: 23,
      user: 6,
    },
  ];
  useEffect(() => {
    formatDataToOrder();
  }, []);

  let config = {
    // replace this key with yours
    publicKey: "test_public_key_ad21e5a28b0c4a46bec1e93f7144d126",
    productIdentity: "1857",
    productName: "AHJIN Ecommerce",
    productUrl: "http://localhost:3000",
    eventHandler: {
      onSuccess(payload) {
        let data = {
          token: payload.token,
          amount: payload.amount,
        };

        axios
          .post(`http://0.0.0.0:8000/api/khalti/pay`, data)
          .then((response) => {
            console.log("WOW SUCCESS");
            if (response.status === 200) {
              if (orderItemArray.length < 1) return;
              axios
                .post("http://0.0.0.0:8000/api/orders/", dataTosend, {
                  headers: {
                    authorization: `Bearer ${accessToken}`,
                  },
                })
                .then((res) => {
                  console.log(res);
                })
                .catch((error) => console.log(error));
            }
          })
          .catch((error) => {
            console.log("Error", error);
          });
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };
  const khaltiCheckoutHandler = async () => {
    let checkout = await new KhaltiCheckout(config);
    const price = await totalPriceOfCart();
    checkout.show({ amount: 1000 });
  };

  //DO NOT DELETE THIS WHOLE FUNCTION
  const ahjinCoinBurnHandler = async () => {
    if (currentAccount) {
      await buyAssets(2);
    } else if (currentAccount == undefined) {
      ToastsStore.warning("Please connect with your metamask wallet.");
    } else if (tokenBalance < ahjinCoinCalculator(totalPriceOfCart())) {
      ToastsStore.error("Sorry, You does not have sufficient AC.");
    }
  };

  return (
    <div className="bg-gray-800 font-Roboto">
      <Navbar />

      <main className="lg:w-[80%] w-[full]   bg-gray-800  text-gray-100  mx-auto  flex flex-col space-y-10 lg:gap-x-20 lg:grid grid-cols-10 mt-4">
        <div className="col-span-6  max-h-screen  overflow-scroll scrollbar-hide   text-gray-100  px-4 py-4 min-h-screen">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold mx-2  text-yellow-500">
              Shopping Cart
            </h1>
            <ShoppingBagIcon className="text-yellow-500 h-8 w-8" />
          </div>
          <div className="bg-gray-900 sticky  -top-4 z-40 lg:text-sm text-xs  grid grid-cols-10 pl-2 my-4 border-y py-3">
            <h1 className="col-span-5 lg:col-span-6">PRODUCT DETAILS</h1>
            <div className="flex items-center text-xs lg:text-sm justify-between px-2 col-span-5 lg:col-span-4  ">
              <h1>QUANTITY</h1>
              <h1>PRICE</h1>
              <h1>TOTAL</h1>
            </div>
          </div>
          {cartProductDetails.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="text-sm grid grid-cols-10 pl-2 my-4 border-b py-4  "
            >
              <div className="lg:col-span-6 col-span-5 flex lg:items-center flex-col lg:flex-row space-y-3  lg:space-x-3  ">
                <div className="w-40 h-32">
                  <img
                    src={product.image}
                    className="object-cover h-full w-full"
                    layout="fill"
                    alt="product"
                  />
                </div>
                <div className="pr-2 flex flex-col space-y-2 py-2">
                  <h1 className="font-bold lg:w-60 w-44 text-left text-cyan-100 pb-3">
                    {product.name}
                  </h1>
                  {/* //todo:check d_cat */}

                  {product.d_cat === "laptop" && (
                    <>
                      <div className="flex items-center space-x-2">
                        <p>RAM: 4GB</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p>SSD:</p>
                        <p>256</p>
                      </div>
                    </>
                  )}
                  {product.cat === "C" && (
                    <>
                      <div className="flex items-center space-x-2">
                        <p className="uppercase">Color: red</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p>Size:</p>
                        <p>XL</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between lg:col-span-4 col-span-5 text-xs lg:text-sm ">
                <h1 className="pl-10">{quantity}</h1>
                <h1 className="pl-3">
                  Rs.{product.price_m - product.discount}
                </h1>
                <h1 className="pr-2 flex flex-col space-y-2 items-center">
                  <p>Rs.{quantity * (product.price_m - product.discount)}</p>
                  <p>
                    {/* {ahjinCoinCalculator(
                      quantity * (product.price_m - product.discount)
                    )}{" "} */}
                    AC
                  </p>
                </h1>
              </div>
            </div>
          ))}
        </div>

        {/* //!checkout wala */}

        <div className="col-span-4 bg-gray-800">
          <main className="h-auto   w-full bg-gray-700 shadow-lg shadow-gray-400 text-gray-100 px-6 py-3 ">
            <h1 className="uppercase font-semibold border-b border-red-500 text-red-500  max-w-fit my-4">
              order summary
            </h1>

            <section className="text-sm flex flex-col space-y-8 ">
              <div className="flex items-center text-gray-300 justify-between lg:w-3/4">
                <h1>Shipping cost</h1>
                <p>Rs150</p>
              </div>
              <div className="flex items-center text-gray-300 justify-between lg:w-3/4">
                <h1>Shipping Discount</h1>
                <p>Rs10</p>
              </div>
              <div className="flex text-gray-300 items-center justify-between lg:w-3/4">
                <h1>Tax</h1>
                <p>13%</p>
              </div>
              <div className="flex items-center justify-between lg:w-3/4">
                <h1 className="text-xl text-gray-100">Estimated Total</h1>
                <p className="text-xl text-yellow-500 tracking-wider">
                  Rs.{totalPriceOfCart()}
                </p>
              </div>

              <button
                className="bg-red-500 py-3 hover:bg-red-600 transition-all active:scale-90 duration-500 ease-in-out "
                onClick={khaltiCheckoutHandler}
              >
                Checkout Now
              </button>
              <button
                className="bg-red-500 py-3 hover:bg-red-600 transition-all active:scale-90 duration-500 ease-in-out "
                onClick={ahjinCoinBurnHandler}
              >
                Checkout From AC
              </button>
            </section>
          </main>
        </div>
      </main>
      <Footer />
      <ToastsContainer store={ToastsStore} />
    </div>
  );
}

export default Cart;
