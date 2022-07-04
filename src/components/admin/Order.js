import React, { useEffect, useState } from "react";
import axios from "axios";
import { Fade } from "react-reveal";
import OrderCard from "./OrderCard";

function Order() {
  const [orders, setOrders] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const userDetail = JSON.parse(localStorage.getItem("userDetails"));
  const accessToken = userDetail?.access_token;
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
  }, [trigger]);
  return (
    <main className="px-4 lg:col-span-10 col-span-12 lg:py-5 py-20 max-h-[100vh] overflow-scroll text-gray-100 flex flex-col space-y-6 ">
      <h1 className="font-bold text-cyan-50 text-2xl my-2 mx-10">
        ALL Orders({orders.length})
      </h1>

      {/* <Fade top> */}
      {orders.map((order, index) => (
        <OrderCard
          key={index}
          delivered={order?.delivered}
          orderProducts={order?.products}
          total={order?.total}
          id={order?.id}
          trigger={trigger}
          setTrigger={setTrigger}
          paymentMethod={order?.paymentMethod}
        />
      ))}
      {/* </Fade> */}
    </main>
  );
}

export default Order;
