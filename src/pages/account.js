import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  UserCircleIcon,
  ShoppingBagIcon,
  CogIcon,
  LockClosedIcon,
  ExclamationIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { Fade } from "react-reveal";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import styles from "./account.module.css";
import { shortenAddress } from "../utils/shortenAddress";
import { AjhinContext } from "../context/ahjinContext";
import BuyTokenModal from "../utils/modal/BuyToken";
import toast, { Toaster } from "react-hot-toast";

function Account() {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [accountNumber, setaccountNumber] = useState(1);
  const [currentPassword, setCurrentpassword] = useState("");
  const [newPassword, setNewpassword] = useState("");
  const [confirmNewPassword, setConfirmNewpassword] = useState("");
  const [userName, setUserName] = useState(userDetails?.user?.username);
  const [email, setEmail] = useState(userDetails?.user?.email);
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(
    userDetails?.user?.phone_number
  );
  const [orders, setOrders] = useState([]);
  const accessToken = userDetails?.access_token;
  const userId = userDetails?.user?.pk;

  useEffect(() => {
    const getOrders = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/orders/user/${userId}`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setOrders(res.data);
    };
    getOrders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    connectWallet,
    currentAccount,
    setBuyModal,
    buyModal,
    closeBuyModal,
    tokenBalance,
  } = useContext(AjhinContext);

  const access_token = userDetails?.access_token;
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        return toast.error("Please enter all the fields");
      }
      if (newPassword !== confirmNewPassword) {
        return toast.error("Please make sure passwords match");
      }
      if (currentPassword === newPassword) {
        return toast.error("Current and new passwords cannot be same.");
      }

      axios
        .post(
          "http://localhost:8000/api/user/password/change/",
          {
            old_password: currentPassword,
            new_password1: newPassword,
            new_password2: confirmNewPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          toast.success("password changed successfully!");
        })
        .catch((err) => {
          if (err) {
            let errArr = [];
            setError(err.response?.data);
            if (error) {
              Object.entries(error && error).forEach(([key, value]) =>
                errArr.push(value)
              );
            }

            errArr.forEach((m) => {
              m.forEach((n) => {
                toast.error(n, { id: "common" });
              });
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(error);

  const handleSubmitEditAccount = (e) => {
    e.preventDefault();
    let dataToSend = {};
    if (userName !== userDetails?.user?.username) {
      dataToSend.userName = userName;
    } else if (email !== userDetails?.user?.email) {
      dataToSend.email = email;
    } else if (phoneNumber !== userDetails?.user?.phone_number) {
      dataToSend.phone_number = phoneNumber;
    } else {
      dataToSend = {};
    }

    try {
      axios
        .patch("http://localhost:8000/api/user/detail/", dataToSend, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => {
          toast.success("User Updated Sucessfully!");
          let userDetailss = {};
          let userData = res.data;
          userDetailss.access_token = userDetails?.access_token;
          userDetailss.refresh_token = userDetails?.refresh_token;
          userDetailss.user = userData;
          localStorage.setItem("userDetails", JSON.stringify(userDetailss));
        });
    } catch (error) {
      toast.error("Something went Wrong!");
    }
  };

  return (
    <div className="bg-gray-800">
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar />

      <main className="lg:max-w-7xl w-full mx-auto bg-gray-700 min-h-[91vh] mt-4 grid grid-cols-10">
        {/* sidebar */}

        <section className="col-span-2 bg-gray-900 max-h-[100vh] hidden lg:inline-block">
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

        <section className="lg:col-span-8 col-span-10  max-h-screen overflow-scroll scrollbar-hide ">
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
              <h1 className=" max-w-fit font-bold text-2xl my-10 mx-[4.5rem] lg:mx-28 text-gray-100">
                My Profile
              </h1>

              <Fade>
                <section className="bg-transparent h-auto max-w-4xl mx-auto my-6    py-8 px-8    flex justify-between flex-wrap">
                  <div className="flex flex-col space-y-4  max-w-fit px-10 py-10 items-cente ">
                    <p className="text-sm text-cyan-500">Username</p>
                    <p className="text-sm font-semibold">
                      {userDetails?.user?.username
                        ? userDetails?.user?.username
                        : "Not Provided."}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-4  max-w-fit  px-10 py-10 items-cente ">
                    <p className="text-sm text-cyan-500">Email Address</p>
                    <p className="text-sm font-semibold">
                      {userDetails?.user?.email
                        ? userDetails?.user?.email
                        : "  Not Provided."}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-4  max-w-fit px-10 py-10 items-cente ">
                    <p className="text-sm text-cyan-500">Phone</p>
                    <p className="text-sm font-semibold">
                      {userDetails?.user?.phone_number
                        ? userDetails?.user?.phone_number
                        : "Not Provided."}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-4 items-center max-w-fit px-10 py-10 ">
                    <p className="text-sm text-cyan-500">Ahjin Coin</p>
                    <p className="text-sm font-semibold">{tokenBalance} AC</p>
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
                    {currentAccount
                      ? shortenAddress(currentAccount)
                      : "No accounts connected!"}
                  </p>
                  <p className="text-white font-semibold text-lg mt-1">
                    Ethereum
                  </p>
                </div>
              </div>

              <div className="flex w-[35%] mx-auto gap-x-2">
                <button
                  onClick={connectWallet}
                  className="bg-cyan-500 text-white text-sm py-3 px-8 max-w-fit rounded-full hover:bg-cyan-600 transition-all duration-300 mt-[2rem] flex items-center justify-center mx-auto"
                >
                  {currentAccount ? "Connected" : "Connect Wallet"}
                </button>
                <button
                  onClick={() => setBuyModal(true)}
                  className="bg-cyan-500 text-white text-sm py-3 px-8 max-w-fit rounded-full hover:bg-cyan-600 transition-all duration-300 mt-[2rem] flex items-center justify-center mx-auto"
                >
                  Buy Token
                </button>
              </div>
            </main>
          )}

          {/*  orders */}

          {accountNumber === 2 && (
            <main className="px-4 lg:py-5 py-20 max-h-[90vh] overflow-scroll scrollbar-hide text-gray-100 flex flex-col space-y-6 ">
              <h1 className="font-bold text-2xl my-2 mx-10">My Orders</h1>

              {orders.length >= 1 ? (
                <div>
                  {orders.map((singleOrder) => {
                    return (
                      <section className="lg:w-[80%] w-full h-auto bg-gray-600 border border-cyan-500 flex items-center flex-col px-5 py-5 space-y-4">
                        {singleOrder?.products.map((product) => {
                          return (
                            <div className="flex items-center justify-between  w-full ">
                              <div className="flex items-center space-x-4">
                                <div className="h-20 w-20   ">
                                  <img
                                    src={product?.image}
                                    layout="fill"
                                    className="object-cover h-full w-full"
                                    alt="profile"
                                  />
                                </div>
                                <p className="text-sm lg:w-80 w-28">
                                  {product?.name}
                                </p>
                              </div>
                              <div className="flex items-center text-sm">
                                <p className="text-gray-300">QTY: &nbsp;</p>
                                {product?.quantity}
                              </div>

                              {singleOrder?.delivered ? (
                                <p className="text-sm text-green-600 font-semibold">
                                  Delivered
                                </p>
                              ) : (
                                <div className="flex items-center space-x-1 text-yellow-500 ">
                                  <p className="text-sm font-semibold">
                                    Not Delivered
                                  </p>
                                  <ExclamationIcon className=" h-6 w-6" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </section>
                    );
                  })}
                </div>
              ) : (
                <p className="text-3xl mx-auto mt-28">No Order till Now.</p>
              )}
            </main>
          )}

          {accountNumber === 3 && (
            <main className="h-full flex  items-center mx-4">
              <Fade top>
                <form
                  onSubmit={handleSubmitEditAccount}
                  className="border border-cyan-500 rounded-md lg:h-[60%] h-auto lg:w-3/4 w-full mx-auto bg-gray-800 px-10 py-4 flex  justify-center flex-col space-y-10 "
                >
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
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-cyan-500 text-white text-sm py-2 px-6 max-w-fit rounded-full hover:bg-cyan-600 transition-all duration-300"
                  >
                    Save
                  </button>
                </form>
              </Fade>
            </main>
          )}

          {accountNumber === 4 && (
            <main className="h-full flex  items-center mx-4">
              <Fade top>
                <form
                  onSubmit={handleSubmitPassword}
                  className="border border-cyan-500 rounded-md h-auto lg:h-[60%] lg:w-3/4 w-full mx-auto bg-gray-800 px-10 py-4 flex  justify-center flex-col space-y-10 "
                >
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
                      value={currentPassword}
                      onChange={(e) => setCurrentpassword(e.target.value)}
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
                      value={newPassword}
                      onChange={(e) => setNewpassword(e.target.value)}
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
                      type="password"
                      className="py-2 px-2 outline-none text-gray-100 font-light text-sm border bg-transparent rounded-lg border-cyan-500"
                      id="confirmnewpassword"
                      name="confirmnewpassword"
                      placeholder="confirm new password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewpassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-cyan-500 text-white text-sm py-2 px-6 max-w-fit rounded-full hover:bg-cyan-600 transition-all duration-300"
                  >
                    Save
                  </button>
                </form>
              </Fade>
            </main>
          )}
        </section>
      </main>
      <BuyTokenModal open={buyModal} handleModal={closeBuyModal} />
    </div>
  );
}

export default Account;
