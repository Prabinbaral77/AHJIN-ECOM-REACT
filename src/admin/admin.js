import React, { useState } from "react";
import Sidebar from "../component/admin/Sidebar";
import User from "../component/admin/User";
import Product from "../component/admin/Product";
import Order from "../component/admin/Order";
import AddProduct from "../component/admin/AddProduct";

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
