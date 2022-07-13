import React, { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import UpdateOrderStatus from "../../utils/modal/UpdateOrderStatus";
import axios from "axios";
import { AjhinContext } from "../../context/ahjinContext";
import { CheckIcon, ExclamationIcon } from "@heroicons/react/outline";
import { triggerOrderAfterReward } from "../../redux/products/action";
import { QrcodeIcon } from "@heroicons/react/outline";
import QRCode from "react-qr-code";
import { useDispatch } from "react-redux";
const OrderCard = ({
  orderProducts,
  delivered,
  total,
  id,
  setTrigger,
  trigger,
  paymentMethod,
  ethAccountAddress,
  isRewarded,
}) => {
  const dispatch = useDispatch();
  const { sendEthInReward } = useContext(AjhinContext);
  const [singleOrder, setSingleOrder] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isQrcodeShown, setIsQrCodeShown] = useState(false);
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
        dispatch(triggerOrderAfterReward());
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong.");
      });
  };

  const sendEthInRewardHandler = async () => {
    await sendEthInReward(ethAccountAddress);
    axios
      .patch(
        `http://localhost:8000/api/orders/${id}`,
        {
          paymentMethod: paymentMethod,
          isRewarded: true,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Rewarded successfully.");
      })
      .catch((error) => {
        toast.error("Something went wrong.");
      });
    setTrigger(!trigger);
  };

  useEffect(() => {
    orderProducts.forEach((element) => {
      setSingleOrder((prevData) => [
        ...prevData,
        {
          productName: element?.name,
          quantity: element?.quantity,
          user: element?.user,
        },
      ]);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const data = {
    name: singleOrder,
    price: total,
    paymentMethod: paymentMethod === "K" ? "Khalti" : "AC",
    phoneNumber: orderProducts[0]?.phoneNumber
      ? orderProducts[0]?.phoneNumber
      : "Not Provided",
  };

  let string = `
  Product Name = ${data.name[0]?.productName}  ${
    data.name[1]?.productName ? data.name[1]?.productName : ""
  }
  Quantity = ${data?.name[0]?.quantity}, ${
    data?.name[1]?.quantity ? data?.name[1]?.quantity : ""
  } 
  Price = ${data?.price} 
  Payment Method = ${data?.paymentMethod} 
  Phone Number = ${data?.phoneNumber}`;

  return (
    <div>
      <Toaster />
      <section className=" relative h-auto bg-gray-700 flex items-center flex-col px-5 py-5 space-y-4">
        {orderProducts.map((singleOrder) => {
          // console.log(singleOrder, orderProducts);
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
                  <div className="flex  font-semibold ">
                    <p className="text-white">Payment method: &nbsp;</p>
                    {paymentMethod === "K" ? (
                      <span className="text-purple-600">Khalti</span>
                    ) : (
                      <span>AC</span>
                    )}
                  </div>
                  <p className="text-sm text-yellow-500 pt-2">
                    Price: Rs {singleOrder?.quantity * singleOrder?.price}(
                    {singleOrder?.quantity})
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        <article className="absolute right-8 top-[20%]  flex flex-col items-center space-y-6">
          <div className="flex gap-4">
            <p className="text-sm text-yellow-500">Price: Rs {total}</p>
            <QrcodeIcon
              className="h-6 w-6 cursor-pointer z-40 absolute  -right-4 top-[2.8rem]"
              onClick={() => setIsQrCodeShown(!isQrcodeShown)}
            />
            {isQrcodeShown && (
              <div style={{ zIndex: 99 }} className="p-2 bg-purple-200">
                {/* <p>
                  {data.name.forEach((e) =>
                    e.forEach((eSecond) => console.log(eSecond.productName))
                  )}
                </p> */}
                <QRCode value={string} className="" />
                <p className="text-black flex items-center justify-center py-2 underline">
                  Order Details
                </p>
              </div>
            )}
          </div>

          {delivered ? (
            <div className="flex items-center space-x-1 ">
              <p className="text-sm text-green-600 font-semibold">Delivered</p>
              <CheckIcon className="text-green-600 h-6 w-6" />
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-yellow-500 ">
              <p className="text-sm font-semibold">Pending</p>
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
            {isRewarded ? (
              <p className="text-green-600 font-bold cursor-pointer">
                Reward already send
              </p>
            ) : (
              ethAccountAddress && (
                <p
                  className="text-green-600 font-bold cursor-pointer"
                  onClick={sendEthInRewardHandler}
                >
                  Send Reward
                </p>
              )
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
