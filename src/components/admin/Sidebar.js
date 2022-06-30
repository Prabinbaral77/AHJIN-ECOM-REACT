import React from "react";
import {
  UserGroupIcon,
  CollectionIcon,
  ShoppingBagIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";

function Sidebar({ setadminNumber, adminNumber }) {
  return (
    <main className="bg-gray-900 col-span-2 max-h-screen">
      <h1 className="text-center my-4 text-2xl animate-pulse font-semibold text-cyan-500 font-mono">
        AHJIN DASHBOARD
      </h1>

      <section className=" h-96 px-4 py-2 flex flex-col space-y-8">
        <div
          onClick={() => setadminNumber(1)}
          className={`flex ${
            adminNumber === 1 && "bg-cyan-600"
          } items-center text-gray-100 space-x-2 hover:bg-cyan-600 px-3 py-2 rounded-xl cursor-pointer transiton-all duration-300`}
        >
          <CollectionIcon className="h-6 w-6" />
          <p className="font-light">Products</p>
        </div>
        <div
          onClick={() => setadminNumber(2)}
          className={`flex ${
            adminNumber === 2 && "bg-cyan-600"
          }  group items-center text-gray-100 space-x-2 hover:bg-cyan-600  px-3 py-2 rounded-xl cursor-pointer transiton-all duration-300`}
        >
          <UserGroupIcon className="h-6 w-6 " />
          <p className="font-light">Users</p>
        </div>
        <div
          onClick={() => setadminNumber(3)}
          className={`flex ${
            adminNumber === 3 && "bg-cyan-600"
          } items-center text-gray-100 space-x-2 hover:bg-cyan-600 px-3 py-2 rounded-xl cursor-pointer transiton-all duration-300`}
        >
          <ShoppingBagIcon className="h-6 w-6" />
          <p className="font-light">Orders</p>
        </div>
        <div
          onClick={() => setadminNumber(4)}
          className={` ${
            adminNumber === 4 && "bg-cyan-600"
          } flex items-center text-gray-100 space-x-2 hover:bg-cyan-600 px-3 py-2 rounded-xl cursor-pointer transiton-all duration-300`}
        >
          <PlusCircleIcon className="h-6 w-6" />
          <p className="font-light">Add Product</p>
        </div>
      </section>
      <div className="text-cyan-600 text-sm absolute bottom-5 left-8 flex items-center space-x-2">
      <Link to="/" className="cursor-pointer">
          <p className="cursor-pointer">Home</p>
        </Link>
        &nbsp; /
        <Link to="/" className="cursor-pointer">
          <p className="cursor-pointer">Back</p>
        </Link>
      </div>
    </main>
  );
}

export default Sidebar;
