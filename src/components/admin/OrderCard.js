import React from "react";
import { CheckIcon, ExclamationIcon } from "@heroicons/react/outline";

const OrderCard = ({ quantity, delivered }) => {
  return (
    <section className=" relative h-auto bg-gray-600 flex items-center flex-col px-5 py-5 space-y-4">
      <div className="flex items-center justify-between   w-full ">
        <div className="flex items-center space-x-4 flex-1 ">
          <div className="h-20 w-20 ">
            <img
              src={
                "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
              layout="fill"
              className="object-cover h-full w-full"
              alt="product"
            />
          </div>
          <p className="text-sm lg:w-80 w-28">
            Riversong Vibe N SP30 2.1 Multimedia Speaker - 1 RUPEE GAME
          </p>
          <div className="flex items-center text-sm pl-36">
            <p className="text-gray-300">QTY: &nbsp;</p>
            {quantity}
          </div>
        </div>

        {/* <p className="text-sm text-green-600 font-semibold">
            Delivered
          </p> */}
      </div>

      <article className="absolute right-8 top-5  flex flex-col items-center space-y-6">
        <p className="text-sm text-yellow-500">Price: Rs 12000</p>
        <div className="flex items-center space-x-1 ">
          <p className="text-sm text-green-600 font-semibold">Delivered</p>
          <CheckIcon className="text-green-600 h-6 w-6" />
        </div>

        <div className="flex items-center text-xs space-x-3">
          <p className="text-teal-600 cursor-pointer">Edit</p>
          <p className="text-red-600 cursor-pointer">Delete</p>
        </div>
      </article>
    </section>
  );
};

export default OrderCard;
