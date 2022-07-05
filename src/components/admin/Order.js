import React, { useEffect, useState } from "react";
import axios from "axios";
import { Fade } from "react-reveal";
import OrderCard from "./OrderCard";
import { useSelector } from "react-redux";

function Order() {
  const [orders, setOrders] = useState([]);
  const [filterOrders, setFilterOrders] = useState([]);

  const [trigger, setTrigger] = useState(false);
  const [filterTrigger, setFilterTrigger] = useState(false);
  const [filterString, setFilterString] = useState("all");
  const userDetail = JSON.parse(localStorage.getItem("userDetails"));
  const accessToken = userDetail?.access_token;
  // const ProductDetails = useSelector((state) => state.products);
  // console.log(ProductDetails);

  useEffect(() => {
    const getOrders = async () => {
      const res = await axios.get("http://localhost:8000/api/orders/", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      setOrders(res.data);
    };
    getOrders();
    setFilterTrigger(!filterTrigger);
  }, [trigger]);

  useEffect(() => {
    if (filterString === "delivered") {
      const data = orders.filter((order) => {
        return order?.delivered === true;
      });
      setFilterOrders(data);
    } else if (filterString === "notdelivered") {
      const data = orders.filter((order) => {
        return order?.delivered === false;
      });
      setFilterOrders(data);
    } else if (filterString === "all") {
      setFilterOrders(orders);
    } else {
      setFilterOrders(orders);
    }
  }, [filterString]);
  return (
    <main className="px-4 lg:col-span-10 col-span-12 lg:py-5 py-20 max-h-[100vh] overflow-scroll text-gray-100 flex flex-col space-y-6 ">
      <h1 className="font-bold text-cyan-50 text-2xl my-2 mx-10">
        ALL Orders({orders.length})
      </h1>
      <div className="relative bg-gray-800 px-4 py-2 flex space-y-3 mt-20 mb-10 max-w-6xl">
        <h1 className="text-cyan-500 font-semibold text-xl underline">
          Filter Orders
        </h1>
        <div className="flex items-center space-x-4 text-sm ml-10 -mt-4 absolute -top-2 left-[7rem]">
          <select
            onChange={(e) => setFilterString(e.target.value)}
            name=""
            id=""
            className="bg-gray-700 outline-none text-gray-100 w-full p-2"
          >
            <option value="all">On the basis of delivery</option>
            <option value="delivered">Delivered</option>
            <option value="notdelivered">Not delivered</option>
          </select>
        </div>
      </div>
      {/* <Fade top> */}
      {filterOrders.map((order, index) => (
        <OrderCard
          key={index + 1}
          delivered={order?.delivered}
          orderProducts={order?.products}
          total={order?.total}
          id={order?.id}
          trigger={trigger}
          setTrigger={setTrigger}
          paymentMethod={order?.paymentMethod}
          ethAccountAddress={order?.currentAccount}
          isRewarded={order?.isRewarded}
        />
      ))}
    </main>
  );
}

export default Order;
