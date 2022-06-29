import React from "react";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function Cart() {
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
          <div className="text-sm grid grid-cols-10 pl-2 my-4 border-b py-4  ">
            <div className="lg:col-span-6 col-span-5 flex lg:items-center flex-col lg:flex-row space-y-3  lg:space-x-3  ">
              <div className="w-40 h-36 relative">
                <img
                  src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1468&q=80"
                  className="object-cover"
                  layout="fill"
                  alt="product"
                />
              </div>
              <div className="pr-2 flex flex-col space-y-2 py-2">
                <h1 className="font-bold lg:w-60 w-44 text-left text-cyan-100 pb-3">
                  Laptop dell
                </h1>
                {/* //todo:check d_cat */}

                <>
                  <div className="flex items-center space-x-2">
                    <p>RAM: 4GB</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p>SSD:</p>
                    <p>256</p>
                  </div>
                </>

                <>
                  <div className="flex items-center space-x-2">
                    <p className="uppercase">Color: red</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p>Size:</p>
                    <p>XL</p>
                  </div>
                </>

                <div className="flex items-center space-x-2">
                  <p>Product code:</p>
                  <p>1a5rgd</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between lg:col-span-4 col-span-5 text-xs lg:text-sm ">
              <h1 className="pl-10">10</h1>
              <h1 className="pl-3">Rs.150</h1>
              <h1 className="pr-2 flex flex-col space-y-2 items-center">
                <p>Rs.20000</p>
                <p>10 AC</p>
              </h1>
            </div>
          </div>
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
                <p className="text-xl text-yellow-500 tracking-wider">Rs.10</p>
              </div>

              <button
                className="bg-red-500 py-3 hover:bg-red-600 transition-all active:scale-90 duration-500 ease-in-out "
                // onClick={sendEthInReward}
              >
                Checkout Now
              </button>
              <button
                className="bg-red-500 py-3 hover:bg-red-600 transition-all active:scale-90 duration-500 ease-in-out "
                // onClick={ahjinCoinBurnHandler}
              >
                Checkout From AC
              </button>
            </section>
          </main>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Cart;
