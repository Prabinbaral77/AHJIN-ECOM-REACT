import React, { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import UpdateOrderStatus from "../../utils/modal/UpdateOrderStatus";
import axios from "axios";
import { AjhinContext } from "../../context/ahjinContext";
import { CheckIcon, ExclamationIcon } from "@heroicons/react/outline";

const OrderCard = ({
  orderProducts,
  delivered,
  total,
  id,
  setTrigger,
  trigger,
  paymentMethod,
  ethAccountAddress,
}) => {
  const { sendEthInReward } = useContext(AjhinContext);
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal(!openModal);
  };
  const userDetail = JSON.parse(localStorage.getItem("userDetails"));
  const accessToken = userDetail?.access_token;

  const deleteOrderHandler = (id) => {
    axios
      .delete(`http://localhost:8000/api/orders/${id}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Delete successfully.");
        setTrigger(!trigger);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong.");
      });
  };

  return (
    <div>
      <Toaster />
      <section className=" relative h-auto bg-gray-600 flex items-center flex-col px-5 py-5 space-y-4">
        {orderProducts.map((singleOrder) => {
          return (
            <div className="flex items-center justify-between   w-full ">
              <div className="flex items-center space-x-4 flex-1 ">
                <div className="h-20 w-20 ">
                  <img
                    src={singleOrder?.image}
                    layout="fill"
                    className="object-cover h-full w-full"
                    alt="product"
                  />
                </div>
                <p className="text-sm lg:w-80 w-28">{singleOrder?.name}</p>
                <div className="flex items-center text-sm pl-36 flex-col">
                  <div className="flex text-[#322151] font-semibold">
                    <p className="text-gray-300">paymentMethod: &nbsp;</p>
                    {paymentMethod === "K" ? "Khalti" : "AC"}
                  </div>
                  <p className="text-sm text-yellow-500">Price: Rs {total}</p>
                </div>
              </div>
            </div>
          );
        })}

        <article className="absolute right-8 top-[20%]  flex flex-col items-center space-y-6">
          <p className="text-sm text-yellow-500">Price: Rs {total}</p>

          {delivered ? (
            <div className="flex items-center space-x-1 ">
              <p className="text-sm text-green-600 font-semibold">Delivered</p>
              <CheckIcon className="text-green-600 h-6 w-6" />
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-yellow-500 ">
              <p className="text-sm font-semibold">Not Delivered</p>
              <ExclamationIcon className=" h-6 w-6" />
            </div>
          )}

          <div className="flex items-center text-xs space-x-3">
            <p
              className="text-teal-600 font-bold cursor-pointer"
              onClick={() => setOpenModal(true)}
            >
              Edit
            </p>
            <p
              className="text-red-600 font-bold cursor-pointer"
              onClick={() => deleteOrderHandler(id)}
            >
              Delete
            </p>
            {ethAccountAddress && (
              <p
                className="text-green-600 font-bold cursor-pointer"
                onClick={() => sendEthInReward(ethAccountAddress)}
              >
                Send Reward
              </p>
            )}
          </div>
        </article>
      </section>
      <UpdateOrderStatus
        open={openModal}
        handleModal={handleModal}
        id={id}
        paymentMethod={paymentMethod}
        trigger={trigger}
        setTrigger={setTrigger}
      />
    </div>
  );
};

export default OrderCard;
