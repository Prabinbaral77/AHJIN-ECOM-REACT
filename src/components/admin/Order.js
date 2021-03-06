import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const ProductDetails = useSelector((state) => state.products);
  console.log(orders, "ordersorders");

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
  }, [trigger, ProductDetails?.refreshOrder]); // eslint-disable-line react-hooks/exhaustive-deps

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
    } else {
      setFilterOrders(orders);
    }
  }, [filterString]); // eslint-disable-line react-hooks/exhaustive-deps
  // console.log(filterOrders);
  return (
    <main className="px-4 lg:col-span-10 col-span-12 lg:py-5 py-20 max-h-[100vh] overflow-scroll text-gray-100 flex flex-col space-y-6 ">
      <h1 className="font-bold text-cyan-50 text-2xl my-2 mx-10">
        ALL Orders({orders.length})
      </h1>
      <div className="relative bg-gray-800 px-4 py-2 flex space-x-3 items-center mt-20 mb-10 max-w-6xl">
        <h1 className="text-cyan-500 font-semibold text-xl underline">
          Filter Orders
        </h1>

        <select
          onChange={(e) => setFilterString(e.target.value)}
          name=""
          id=""
          className="bg-gray-700 outline-none text-gray-100 w-[25%] cursor-pointer text-sm p-2"
        >
          <option value="all">On the basis of delivery</option>
          <option value="delivered">Delivered</option>
          <option value="notdelivered">Not delivered</option>
        </select>
      </div>

      {/* <Fade top> */}
      {filterOrders.length > 0
        ? filterOrders.map((order, index) => {
            console.log(order?.shippingAddress, "mugi");
            return (
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
                shippingAddress={
                  order?.shippingAddress == undefined
                    ? "no address found"
                    : order?.shippingAddress
                }
              />
            );
          })
        : orders.map((order, index) => (
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
              shippingAddress={
                order?.shippingAddress == undefined
                  ? "no address found"
                  : order?.shippingAddress
              }
            />
          ))}
    </main>
  );
}

export default Order;
