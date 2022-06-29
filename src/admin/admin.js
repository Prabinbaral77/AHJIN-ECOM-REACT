import React, { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import User from "../components/admin/User";
import Product from "../components/admin/Product";
import Order from "../components/admin/Order";
import AddProduct from "../components/admin/AddProduct";

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
    </div>
  );
}

export default Admin;
