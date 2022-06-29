import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import {
  UserCircleIcon,
  ShoppingBagIcon,
  CogIcon,
  LockClosedIcon,
} from "@heroicons/react/outline";
import { Fade } from "react-reveal";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import styles from "./account.module.css";

function Account() {
  const [accountNumber, setaccountNumber] = useState(1);

  return (
    <div className="bg-gray-800">
      <Navbar />

      <main className="lg:max-w-7xl w-full mx-auto bg-gray-700 min-h-screen mt-4 grid grid-cols-10">
        {/* sidebar */}

        <section className="col-span-2 bg-gray-900 hidden lg:inline-block">
          <h1 className="font-bold px-5 text-gray-100 my-10 text-2xl">
            My Account
          </h1>

          <div className="flex flex-col space-y-6 ">
            <div
              onClick={() => setaccountNumber(1)}
              className="text-gray-100 text-sm flex items-center space-x-2 cursor-pointer  px-4 hover:text-cyan-500 hover:bg-gray-700 transition-all duration-300 w-48 py-2 mx-4 "
            >
              <UserCircleIcon className="h-6 w-6  " />
              <p className="">My Profile</p>
            </div>
            <div
              onClick={() => setaccountNumber(2)}
              className="text-gray-100 text-sm flex items-center space-x-2  px-4 cursor-pointer hover:text-cyan-500 hover:bg-gray-700 transition-all duration-300 w-48 py-2 mx-4 "
            >
              <ShoppingBagIcon className="h-6 w-6 " />
              <p>My orders</p>
            </div>
            <div
              onClick={() => setaccountNumber(3)}
              className="text-gray-100 text-sm flex items-center space-x-2  px-4 cursor-pointer hover:text-cyan-500 hover:bg-gray-700 transition-all duration-300 w-48 py-2 mx-4 "
            >
              <CogIcon className="h-6 w-6 " />
              <p>Edit Account</p>
            </div>
            <div
              onClick={() => setaccountNumber(4)}
              className="text-gray-100 text-sm flex items-center space-x-2  px-4 cursor-pointer hover:text-cyan-500 hover:bg-gray-700 transition-all duration-300 w-48 py-2 mx-4 "
            >
              <LockClosedIcon className="h-6 w-6 " />
              <p>Change Password</p>
            </div>
          </div>
        </section>

        {/* mobile view topbar */}

        {/* main */}

        <section className="lg:col-span-8 col-span-10  max-h-screen overflow-scroll scrollbar-hide">
          <div className="text-gray-100 flex bg-gray-800 lg:hidden w-screen h-12  items-center justify-around">
            <UserCircleIcon
              onClick={() => setaccountNumber(1)}
              className="h-7 w-7 cursor-pointer"
            />
            <ShoppingBagIcon
              onClick={() => setaccountNumber(2)}
              className="h-7 w-7 cursor-pointer"
            />
            <CogIcon
              onClick={() => setaccountNumber(3)}
              className="h-7 w-7 cursor-pointer"
            />
            <LockClosedIcon
              onClick={() => setaccountNumber(4)}
              className="h-7 w-7 cursor-pointer"
            />
          </div>

          {/* details */}

          {accountNumber === 1 && (
            <main className="px-4 py-5 text-gray-100 ">
              <h1 className=" max-w-fit font-bold text-2xl my-10 mx-[4.5rem] lg:mx-28 text-cyan-500">
                My Profile
              </h1>

              <Fade>
                <section className="bg-transparent h-auto max-w-4xl mx-auto my-6    py-8 px-8    flex justify-between flex-wrap">
                  <div className="flex flex-col space-y-4  max-w-fit px-10 py-10 items-cente ">
                    <p className="text-sm text-cyan-500">Username</p>
                    <p className="text-sm font-semibold">Sankalpa</p>
                  </div>
                  <div className="flex flex-col space-y-4  max-w-fit  px-10 py-10 items-cente ">
                    <p className="text-sm text-cyan-500">Email Address</p>
                    <p className="text-sm font-semibold">
                      sankalpa115@gmail.com
                    </p>
                  </div>
                  <div className="flex flex-col space-y-4  max-w-fit px-10 py-10 items-cente ">
                    <p className="text-sm text-cyan-500">Phone</p>
                    <p className="text-sm font-semibold">986474646</p>
                  </div>
                  <div className="flex flex-col space-y-4 items-center max-w-fit px-10 py-10 ">
                    <p className="text-sm text-cyan-500">Ahjin Coin</p>
                    <p className="text-sm font-semibold">10</p>
                  </div>
                </section>
              </Fade>
              <div className="flex flex-col space-y-6 w-[40%] items-center justify-center"></div>
              <div className="">
                <div
                  className={`p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full  ${styles.ethCard} flex items-center justify-center mx-auto`}
                >
                  <div className="flex justify-between flex-col w-full h-full">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-full border-2 border-white flex justifiy-center items-center">
                        <SiEthereum
                          className="ml-2"
                          // fontsize={21}
                          color="#fff"
                        />
                      </div>
                      <BsInfoCircle color="#fff" />
                    </div>
                  </div>
                  <p className="text-white font-semibold text-sm -mt-14">
                    jgkdjfjdjfkdjfkjdjfd
                  </p>
                  <p className="text-white font-semibold text-lg mt-1">
                    Ethereum
                  </p>
                </div>
              </div>

              <div className="flex w-[30%] mx-auto">
                <button
                  // onClick={connectWallet}
                  className="bg-cyan-500 text-white text-sm py-3 px-8 max-w-fit rounded-full hover:bg-cyan-600 transition-all duration-300 mt-[2rem] flex items-center justify-center mx-auto"
                >
                  {/* {currentAccount ? "Connected" : "Connect Wallet"} */}{" "}
                  Connected
                </button>
                <button
                  // onClick={() => setBuyModal(true)}
                  className="bg-cyan-500 text-white text-sm py-3 px-8 max-w-fit rounded-full hover:bg-cyan-600 transition-all duration-300 mt-[2rem] flex items-center justify-center mx-auto"
                >
                  Buy Token
                </button>
              </div>
            </main>
          )}

          {/*  orders */}

          {accountNumber === 2 && (
            <main className="px-4 lg:py-5 py-20 text-gray-100 flex flex-col space-y-6 ">
              <h1 className="font-bold text-2xl my-2 mx-10">My Orders</h1>

              <Fade top>
                <section className="lg:w-[80%] w-full h-auto bg-gray-600 border border-cyan-500 flex items-center flex-col px-5 py-5 space-y-4">
                  <div className="flex items-center justify-between  w-full ">
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 bg-blue-400 relative ">
                        <img
                          src={
                            "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                          }
                          layout="fill"
                          className="object-cover"
                          alt="product"
                        />
                      </div>
                      <p className="text-sm lg:w-80 w-28">
                        Riversong Vibe N SP30 2.1 Multimedia Speaker - 1 RUPEE
                        GAME
                      </p>
                    </div>
                    <div className="flex items-center text-sm">
                      <p className="text-gray-300">QTY: &nbsp;</p>
                      {1}
                    </div>

                    <p className="text-sm text-green-600 font-semibold">
                      Delivered
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full ">
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 bg-blue-400 relative ">
                        <img
                          src={
                            "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                          }
                          layout="fill"
                          className="object-cover"
                          alt="product"
                        />
                      </div>
                      <p className="text-sm lg:w-80 w-28">
                        Riversong Vibe N SP30 2.1 Multimedia Speaker - 1 RUPEE
                        GAME
                      </p>
                    </div>
                    <div className="flex items-center text-sm">
                      <p className="text-gray-300">QTY: &nbsp;</p>
                      {1}
                    </div>

                    <p className="text-sm text-green-600 font-semibold">
                      Delivered
                    </p>
                  </div>
                </section>
                <section className="lg:w-[80%] w-full h-auto bg-gray-600 border border-cyan-500 flex items-center flex-col px-5 py-5 space-y-4">
                  <div className="flex items-center justify-between  w-full ">
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 bg-blue-400 relative ">
                        <img
                          src={
                            "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                          }
                          layout="fill"
                          className="object-cover"
                          alt="product"
                        />
                      </div>
                      <p className="text-sm lg:w-80 w-28">
                        Riversong Vibe N SP30 2.1 Multimedia Speaker - 1 RUPEE
                        GAME
                      </p>
                    </div>
                    <div className="flex items-center text-sm">
                      <p className="text-gray-300">QTY: &nbsp;</p>
                      {1}
                    </div>

                    <p className="text-sm text-green-600 font-semibold">
                      Delivered
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full ">
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 bg-blue-400 relative ">
                        <img
                          src={
                            "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                          }
                          layout="fill"
                          className="object-cover"
                          alt="profile"
                        />
                      </div>
                      <p className="text-sm lg:w-80 w-28">
                        Riversong Vibe N SP30 2.1 Multimedia Speaker - 1 RUPEE
                        GAME
                      </p>
                    </div>
                    <div className="flex items-center text-sm">
                      <p className="text-gray-300">QTY: &nbsp;</p>
                      {1}
                    </div>

                    <p className="text-sm text-green-600 font-semibold">
                      Delivered
                    </p>
                  </div>
                </section>
                <section className="lg:w-[80%] w-full h-auto bg-gray-600 border border-cyan-500 flex items-center flex-col px-5 py-5 space-y-4">
                  <div className="flex items-center justify-between  w-full ">
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 bg-blue-400 relative ">
                        <img
                          src={
                            "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                          }
                          layout="fill"
                          className="object-cover"
                          alt="profile"
                        />
                      </div>
                      <p className="text-sm lg:w-80 w-28">
                        Riversong Vibe N SP30 2.1 Multimedia Speaker - 1 RUPEE
                        GAME
                      </p>
                    </div>
                    <div className="flex items-center text-sm">
                      <p className="text-gray-300">QTY: &nbsp;</p>
                      {1}
                    </div>

                    <p className="text-sm text-green-600 font-semibold">
                      Delivered
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full ">
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 bg-blue-400 relative ">
                        <img
                          src={
                            "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                          }
                          layout="fill"
                          className="object-cover"
                          alt="profile"
                        />
                      </div>
                      <p className="text-sm lg:w-80 w-28">
                        Riversong Vibe N SP30 2.1 Multimedia Speaker - 1 RUPEE
                        GAME
                      </p>
                    </div>
                    <div className="flex items-center text-sm">
                      <p className="text-gray-300">QTY: &nbsp;</p>
                      {1}
                    </div>

                    <p className="text-sm text-green-600 font-semibold">
                      Delivered
                    </p>
                  </div>
                </section>
              </Fade>
            </main>
          )}

          {accountNumber === 3 && (
            <main className="h-full flex  items-center mx-4">
              <Fade top>
                <form className="border border-cyan-500 rounded-md lg:h-[60%] h-auto lg:w-3/4 w-full mx-auto bg-gray-800 px-10 py-4 flex  justify-center flex-col space-y-10 ">
                  <h1 className="text-gray-100 font-semibold text-xl">
                    EDIT ACCOUNT
                  </h1>
                  <div className="flex flex-col space-y-4">
                    <label
                      className="text-gray-100 text-xs pl-1"
                      htmlFor="username"
                    >
                      USERNAME
                    </label>
                    <input
                      type="text"
                      className="py-2 px-2 outline-none text-gray-100 font-light text-sm border bg-transparent rounded-lg border-cyan-500"
                      id="username"
                      name="username"
                      placeholder="username"
                    />
                  </div>
                  <div className="flex flex-col space-y-4">
                    <label
                      className="text-gray-100 text-xs pl-1"
                      htmlFor="username"
                    >
                      EMAIL
                    </label>
                    <input
                      type="email"
                      className="py-2 px-2 outline-none text-gray-100 font-light text-sm border bg-transparent rounded-lg border-cyan-500"
                      id="email"
                      name="email"
                      placeholder="email"
                    />
                  </div>
                  <div className="flex flex-col space-y-4">
                    <label
                      className="text-gray-100 text-xs pl-1"
                      htmlFor="username"
                    >
                      PHONE
                    </label>
                    <input
                      type="text"
                      className="py-2 px-2 outline-none text-gray-100 font-light text-sm border bg-transparent rounded-lg border-cyan-500"
                      id="phone"
                      name="phone"
                      placeholder="phone"
                    />
                  </div>
                  <button className="bg-cyan-500 text-white text-sm py-2 px-6 max-w-fit rounded-full hover:bg-cyan-600 transition-all duration-300">
                    Save
                  </button>
                </form>
              </Fade>
            </main>
          )}

          {accountNumber === 4 && (
            <main className="h-full flex  items-center mx-4">
              <Fade top>
                <form className="border border-cyan-500 rounded-md h-auto lg:h-[60%] lg:w-3/4 w-full mx-auto bg-gray-800 px-10 py-4 flex  justify-center flex-col space-y-10 ">
                  <h1 className="text-gray-100 font-semibold text-xl">
                    CHANGE PASSWORD
                  </h1>
                  <div className="flex flex-col space-y-4">
                    <label
                      className="text-gray-100 text-xs pl-1"
                      htmlFor="username"
                    >
                      CURRENT PASSWORD
                    </label>
                    <input
                      type="password"
                      className="py-2 px-2 outline-none text-gray-100 font-light text-sm border bg-transparent rounded-lg border-cyan-500"
                      id="currentpassword"
                      name="currentpassword"
                      placeholder="current password"
                    />
                  </div>
                  <div className="flex flex-col space-y-4">
                    <label
                      className="text-gray-100 text-xs pl-1"
                      htmlFor="username"
                    >
                      NEW PASSWORD
                    </label>
                    <input
                      type="password"
                      className="py-2 px-2 outline-none text-gray-100 font-light text-sm border bg-transparent rounded-lg border-cyan-500"
                      id="newpassword"
                      name="newpassword"
                      placeholder="new password"
                    />
                  </div>
                  <div className="flex flex-col space-y-4">
                    <label
                      className="text-gray-100 text-xs pl-1"
                      htmlFor="username"
                    >
                      CONFIRM NEW PASSWORD
                    </label>
                    <input
                      type="text"
                      className="py-2 px-2 outline-none text-gray-100 font-light text-sm border bg-transparent rounded-lg border-cyan-500"
                      id="confirmnewpassword"
                      name="confirmnewpassword"
                      placeholder="confirm new password"
                    />
                  </div>
                  <button className="bg-cyan-500 text-white text-sm py-2 px-6 max-w-fit rounded-full hover:bg-cyan-600 transition-all duration-300">
                    Save
                  </button>
                </form>
              </Fade>
            </main>
          )}
        </section>
      </main>
      {/* <BuyTokenModal open={buyModal} handleModal={closeBuyModal} /> */}
    </div>
  );
}

export default Account;