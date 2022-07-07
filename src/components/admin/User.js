import axios from "axios";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function User() {
  const [users, setUsers] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const userDetail = JSON.parse(localStorage.getItem("userDetails"));
  const accessToken = userDetail?.access_token;
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("http://localhost:8000/api/user/allusers", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      setUsers(res.data);
    };
    getUsers();
  }, [trigger]); // eslint-disable-line react-hooks/exhaustive-deps
  const deleteUserHandler = (id) => {
    axios
      .delete(`http://localhost:8000/api/user/allusers/${id}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success(" User deleted successfully.");
        setTrigger(!trigger);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong.");
      });
  };
  return (
    <div className="col-span-10 ">
      <Toaster />

      <nav className=" text-cyan-500 text-center font-semibold grid grid-cols-12 px-4 bg-gray-800 shadow-md py-3 sticky top-0 z-50">
        <p className="col-span-1 ">SN</p>
        <p className="col-span-3 uppercase">Username</p>
        <p className="col-span-3 uppercase ">Email</p>
        <p className="col-span-3 uppercase">Phone</p>
      </nav>

      {/* Users */}

      <div className="max-h-screen overflow-scroll flex flex-col space-y-4 py-4 scrollbar-hide">
        {users.map((singleUser, index) => {
          return (
            <section
              key={index}
              className="grid grid-cols-12 text-sm text-center text-gray-100 px-4 py-4"
            >
              <p className="col-span-1">{index + 1}.</p>
              <p className="col-span-3">
                {singleUser?.username
                  ? singleUser?.username
                  : "no Username provided"}
              </p>
              <p className="col-span-3">
                {singleUser?.email ? singleUser?.email : "no Email Provided"}
              </p>
              <p className="col-span-3">
                {singleUser?.phone_number
                  ? singleUser?.phone_number
                  : "No Number Provided"}
              </p>
              {/* <button className="border-b max-w-fit border-green-600 text-green-600 font-semibold">
                Edit
              </button> */}
              <button
                className="border-b max-w-fit border-red-600 text-red-600 font-semibold"
                onClick={() => deleteUserHandler(singleUser?.pk)}
              >
                Delete
              </button>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default User;
