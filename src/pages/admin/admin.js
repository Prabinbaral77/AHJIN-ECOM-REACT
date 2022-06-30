import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import User from "../../components/admin/User";
import Product from "../../components/admin/Product";
import Order from "../../components/admin/Order";
import AddProduct from "../../components/admin/AddProduct";
import {
  UserGroupIcon,
  CollectionIcon,
  ShoppingBagIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";

function Admin() {
  const [adminNumber, setadminNumber] = useState(1);

  return (
    <div className="bg-gray-800">
      {/* <Navbar/> */}
      <main className="w-full min-h-screen bg-gray-800 grid grid-cols-12">
        <Sidebar adminNumber={adminNumber} setadminNumber={setadminNumber} />
        {adminNumber === 1 && <Product />}
        {adminNumber === 2 && <User />}
        {adminNumber === 3 && <Order />}
        {adminNumber === 4 && <AddProduct />}
      </main>

      <div className="h-14 bg-black w-full fixed bottom-0 lg:hidden flex items-center text-gray-100 justify-around ">
        <CollectionIcon onClick = {()=>setadminNumber(1)} className="h-8 w-8"/>
        <UserGroupIcon onClick = {()=>setadminNumber(2)} className="h-8 w-8"/>
        <ShoppingBagIcon onClick = {()=>setadminNumber(3)} className="h-8 w-8"/>
        <PlusCircleIcon onClick = {()=>setadminNumber(4)} className="h-8 w-8"/>

      </div>
    </div>
  );
}

export default Admin;
