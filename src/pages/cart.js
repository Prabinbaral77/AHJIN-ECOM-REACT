import React, { useEffect, useState, useContext } from "react";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";
// import config from "../khalti/khalti.config";
import toast, { Toaster } from "react-hot-toast";
import { AjhinContext } from "../context/ahjinContext";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { ahjinCoinCalculator } from "../utils/ahjinCoinCalculator";
import {
  emptyCartProduct,
  removeProductFromCart,
  updateCartInput,
} from "../redux/products/action";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const [orderFormatKhalti, setOrderFormatKhalti] = useState();
  const [orderItemArrayAhjin, setOrderItemArrayAhjin] = useState();
  const userDetail = JSON.parse(localStorage.getItem("userDetails"));
  const accessToken = userDetail?.access_token;
  const userId = userDetail?.user?.pk;
  const { currentAccount, tokenBalance, buyAssets } = useContext(AjhinContext);
  const cartProductDetails = useSelector((state) => state.products).cart;
  const totalPriceOfCart = () => {
    let price = 0;
    cartProductDetails.forEach(({ product, quantity }) => {
      price +=
        (product?.price_m - product?.price_m * (product?.discount / 100)) *
        quantity;
    });

    return price;
  };

  const formatDataToOrder = async () => {
    // await cartProductDetails.map((singleProduct) => {
    //   setOrderItemArray((prevData) => [
    //     ...prevData,
    //     {
    //       productChosen: singleProduct?.uniquefeatureIndex,
    //       quantity: singleProduct?.quantity,
    //       product: singleProduct?.product?.id,
    //       user: userId,
    //       image: singleProduct?.product?.image,
    //       name: singleProduct?.product?.name,
    //     },
    //   ]);
    // });
    // setrender(!render);
    const productsArray = [];
    let dataFormat = {};
    await cartProductDetails.map((singleProduct) => {
      return productsArray.push({
        productChosen: singleProduct?.uniquefeatureIndex,
        quantity: singleProduct?.quantity,
        product: singleProduct?.product?.id,
        user: userId,
        image: singleProduct?.product?.image,
        name: singleProduct?.product?.name,
        phoneNumber: userDetail?.user?.phone_number,
        price:
          singleProduct?.product?.price_m -
          singleProduct?.product?.price_m *
            (singleProduct?.product?.discount / 100),
      });
    });
    dataFormat.products = await productsArray;
    dataFormat.delivered = false;
    dataFormat.paymentMethod = "K";

    dataFormat.currentAccount = currentAccount;
    dataFormat.total = totalPriceOfCart();
    setOrderFormatKhalti(dataFormat);
  };

  // const formatToOrder = async () => {
  //   let dataFormat = {};
  //   if (orderItemArray.length >= 1) {
  //     dataFormat.products = orderItemArray;
  //     dataFormat.delivered = false;
  //     dataFormat.paymentMethod = "K";
  //     dataFormat.total = totalPriceOfCart();
  //   }
  //   console.log(dataFormat);
  // };

  console.log(cartProductDetails);
  const formatDataToOrderAhjin = async () => {
    // cartProductDetails.forEach((singleProduct) => {
    //   setOrderItemArrayAhjin((prevData) => [
    //     ...prevData,
    //     {
    //       productChosen: singleProduct?.uniquefeatureIndex,
    //       quantity: singleProduct?.quantity,
    //       paymentMethod: "A",
    //       delivered: false,
    //       product: singleProduct?.product?.id,
    //       user: userId,
    //     },
    //   ]);
    // });
    const productsArray = [];
    let dataFormat = {};
    await cartProductDetails.map((singleProduct) => {
      return productsArray.push({
        productChosen: singleProduct?.uniquefeatureIndex,
        quantity: singleProduct?.quantity,
        product: singleProduct?.product?.id,
        user: userId,
        image: singleProduct?.product?.image,
        name: singleProduct?.product?.name,
        phoneNumber: userDetail?.user?.phone_number,
        price:
          singleProduct?.product?.price_m -
          singleProduct?.product?.price_m *
            (singleProduct?.product?.discount / 100),
      });
    });
    dataFormat.products = await productsArray;
    dataFormat.delivered = false;
    dataFormat.paymentMethod = "A";

    dataFormat.currentAccount = currentAccount;
    dataFormat.total = totalPriceOfCart();
    setOrderItemArrayAhjin(dataFormat);
  };

  useEffect(() => {
    formatDataToOrder();
    formatDataToOrderAhjin();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          amount: totalPriceOfCart(),
          // amount: 1,
        };

        axios
          .post(`http://0.0.0.0:8000/api/khalti/pay`, data)
          .then((response) => {
            console.log("WOW SUCCESS");
            if (response.status === 200) {
              axios
                .post("http://0.0.0.0:8000/api/orders/", orderFormatKhalti, {
                  headers: {
                    authorization: `Bearer ${accessToken}`,
                  },
                })
                .then((res) => {
                  console.log(res, "orderd");
                  toast.success("Order successful using Khalti.");
                  dispatch(emptyCartProduct());
                })
                .catch((error) => console.log(error, "not orderd"));
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
    // eslint-disable-next-line
    const price = await totalPriceOfCart();
    checkout.show({ amount: price * 100 });
  };

  //DO NOT DELETE THIS WHOLE FUNCTION
  const ahjinCoinBurnHandler = () => {
    if (currentAccount) {
      let priceInRs = totalPriceOfCart();
      buyAssets(ahjinCoinCalculator(priceInRs))
        .then((res) => {
          // if (res === undefined) return;
          axios
            .post("http://0.0.0.0:8000/api/orders/", orderItemArrayAhjin, {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            })
            .then((res) => {
              console.log(res);
              toast.success("Ordered successful using AC.");
              dispatch(emptyCartProduct());
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => toast.error("Something went wrong"));
    } else if (currentAccount === undefined) {
      ToastsStore.warning("Please connect with your metamask wallet.");
    } else if (tokenBalance < ahjinCoinCalculator(totalPriceOfCart())) {
      ToastsStore.error("Sorry, You does not have sufficient AC.");
    }
  };

  const cartProductRemoveHandler = (id) => {
    console.log(id);
    dispatch(removeProductFromCart(id));
    ToastsStore.success("Successfully removed from cart.");
  };

  const handleQuantityIncrease = (id) => {
    let product;
    let updateCartProduct = cartProductDetails.filter((cart) => {
      product = cart;
      return cart?.product?.id === id;
    });

    // console.log(updateCartProduct);

    const nonUpdateCartProduct = cartProductDetails.filter((cart) => {
      return cart?.product?.id !== id;
    });
    const availableQuantity =
      product?.product?.unique_feature[product?.uniquefeatureIndex - 1]?.count;
    if (updateCartProduct[0].quantity === availableQuantity) {
      return;
    }
    updateCartProduct[0].quantity = updateCartProduct[0].quantity + 1;
    let sendingDetails = [...updateCartProduct, ...nonUpdateCartProduct];
    dispatch(updateCartInput(sendingDetails));
  };

  const handleQuantityDecrease = (id) => {
    let updateCartProduct = cartProductDetails.filter((cart) => {
      return cart?.product?.id === id;
    });
    const nonUpdateCartProduct = cartProductDetails.filter((cart) => {
      return cart?.product?.id !== id;
    });

    if (updateCartProduct[0].quantity === 1) {
      return ToastsStore.error("Sorry, You cannot decrease futhermore.");
    }
    updateCartProduct[0].quantity = updateCartProduct[0].quantity - 1;
    let sendingDetails = [...updateCartProduct, ...nonUpdateCartProduct];
    dispatch(updateCartInput(sendingDetails));
  };
  return (
    <div className="bg-gray-800 font-Roboto">
      <Toaster />
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
          {cartProductDetails.map(
            ({ product, quantity, uniquefea, size, selectedColor }) => (
              <div
                key={product?.id}
                className=" relative text-sm grid grid-cols-10 pl-2 my-4 border-b py-4  "
              >
                <div className="lg:col-span-6 col-span-5 flex lg:items-center flex-col lg:flex-row space-y-3  lg:space-x-3  ">
                  <div className="w-40 h-32">
                    <img
                      src={product?.image}
                      className="object-cover h-full w-full"
                      layout="fill"
                      alt="product"
                    />
                  </div>
                  {console.log(product, "FJDLKFJDSJLK")}
                  <div className="pr-2 flex flex-col space-y-2 py-2">
                    <Link to={`/product/${product?.id}`}>
                      <h1 className="font-bold lg:w-60 w-44 text-left text-cyan-100 pb-3">
                        {product?.name}
                      </h1>
                    </Link>
                    {/* //todo:check d_cat */}

                    {product?.d_cat === "laptop" && (
                      <>
                        <div className="flex items-center space-x-2">
                          <p>
                            RAM:
                            {uniquefea?.RAM}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <p>SSD:</p>
                          <p>{uniquefea?.SSD}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <p>Color:</p>
                          <p>{selectedColor ? selectedColor : "gray"}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <p
                            className="font-bold text-sm text-red-600 cursor-pointer"
                            onClick={() =>
                              cartProductRemoveHandler(product?.id)
                            }
                          >
                            Remove
                          </p>
                        </div>
                      </>
                    )}
                    {product?.cat === "C" && (
                      <>
                        <div className="flex items-center space-x-2">
                          <p className="">Color: {selectedColor}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <p>Size:</p>
                          <p>{size}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <p
                            className="font-bold text-sm text-red-600 cursor-pointer"
                            onClick={() =>
                              cartProductRemoveHandler(product?.id)
                            }
                          >
                            Remove
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between lg:col-span-4 col-span-5 text-xs lg:text-sm ">
                  <div className="flex flex-col space-y-2 scale-75 -ml-5 ">
                    <div className="flex">
                      <p
                        onClick={() => handleQuantityDecrease(product?.id)}
                        className="bg-gray-600 cursor-pointer h-8 w-10 text-gray-100 text-center pt-1 text-sm"
                      >
                        -
                      </p>

                      <label className="text-gray-100 bg-gray-800  w-12 h-8 text-center pt-1">
                        {quantity}
                      </label>
                      <p
                        onClick={() => handleQuantityIncrease(product?.id)}
                        className="bg-gray-600 h-8 cursor-pointer  w-10 text-gray-100 text-center pt-1 text-sm"
                      >
                        +
                      </p>
                    </div>
                  </div>
                  <h1 className="pl-3">
                    Rs.
                    {product?.price_m -
                      product?.price_m * (product?.discount / 100)}
                  </h1>
                  <h1 className="pr-2 flex flex-col space-y-2 items-center">
                    <p>
                      Rs.
                      {quantity *
                        (product?.price_m -
                          product?.price_m * (product?.discount / 100))}
                    </p>
                    <p>
                      {ahjinCoinCalculator(
                        quantity *
                          (product.price_m -
                            product?.price_m * (product?.discount / 100))
                      )}{" "}
                      AC
                    </p>
                  </h1>
                </div>
              </div>
            )
          )}
        </div>

        {/* //!checkout wala */}

        <div className="col-span-4 bg-gray-800">
          <main className="h-auto   w-full bg-gray-700 shadow-lg shadow-gray-400 text-gray-100 px-6 py-3 ">
            <h1 className="uppercase font-semibold border-b border-red-500 text-red-500  max-w-fit my-4">
              order summary
            </h1>

            <section className="text-sm flex flex-col space-y-8 ">
              <a
                href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn/related"
                className="text-sm text-red-500 hover:text-red-600 pb-4 cursor-pointer"
              >
                Please connect with your metaMask wallet to get reward.
              </a>
              <div className="flex items-center text-gray-300 justify-between lg:w-3/4">
                <h1>Shipping cost</h1>
                <p>Rs 150</p>
              </div>
              <div className="flex items-center text-gray-300 justify-between lg:w-3/4">
                <h1>Shipping Discount</h1>
                <p>Rs 10</p>
              </div>

              <div className="flex items-center justify-between lg:w-full">
                <h1 className="text-lg font-bold text-gray-100">
                  Estimated Total
                </h1>
                <p className="text-lg font-bold text-yellow-500 tracking-wider pr-14">
                  Rs.{totalPriceOfCart()}(
                  {ahjinCoinCalculator(totalPriceOfCart())}AC)
                </p>
              </div>

              <button
                className="bg-red-500 py-3 hover:bg-red-600 transition-all active:scale-90 duration-500 ease-in-out "
                onClick={khaltiCheckoutHandler}
              >
                Checkout using khalti
              </button>
              <button
                className="bg-red-500 py-3 hover:bg-red-600 transition-all active:scale-90 duration-500 ease-in-out "
                onClick={ahjinCoinBurnHandler}
              >
                Checkout using AC
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
