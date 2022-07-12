import React, { useState } from "react";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setformData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setformData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const [checkBox, setcheckBox] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const registerUrl = "http://0.0.0.0:8000/api/user/register/";
    if (
      !formData?.username ||
      !formData?.email ||
      !formData?.password ||
      !formData?.confirmPassword ||
      !formData?.phone
    ) {
      toast.error(" Please fill in all the fields");
      return;
    }
    if (formData?.password.length < 8) {
      toast.error("Password must contain at least 8 characters");
      return;
    }
    if (formData?.password !== formData?.confirmPassword) {
      toast.error("passwords don't match.");
      return;
    }
    await axios
      .post(registerUrl, {
        username: formData?.username,
        email: formData?.email,
        password1: formData?.password,
        password2: formData?.confirmPassword,
        phone_number: formData?.phone,
        ahjin_coin: 0,
      })
      .then((res) => {
        console.log(res);
        navigate("/login");
        toast.success("registered successfully.");
      })
      .catch((err) => {
        if (err) {
          let errArr = [];
          setError(err.response?.data);
          console.log(error);
          if (error) {
            Object.entries(error && error).forEach(([key, value]) =>
              errArr.push(value)
            );
          }
          console.log(errArr);

          errArr.map((m) => {
            m.map((n) => {
              toast.error(n, { id: "common" });
            });
          });
        }
      });
  };

  const RedirectLoginHandler = () => {
    // navigate("/home");
  };

  return (
    <main>
      <Toaster />
      <Navbar />
      <div
        className="w-full h-screen bg-no-repeat bg-cover bg-right  flex  items-center pt-20 justify-center"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/305821/pexels-photo-305821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        }}
      >
        <div className=" relative md:w-1/2 w-full mx-3 overflow-hidden py-10 flex-col space-y-6 bg-gray-800 rounded-lg shadow-2xl shadow-gray-600 flex items-center justify-center px-4 ">
          <h1 className="mt-4 self-start text-gray-100 text-3xl font-extralight select-none">
            CREATE AN ACCOUNT
          </h1>

          <form action="" className="" onSubmit={handleRegister}>
            <div className="flex space-x-4 justify-between items-center flex-grow w-full mb-4">
              <input
                type="text"
                placeholder="username"
                required="required"
                name="username"
                onChange={handleChange}
                className=" font-light outline-none border-1 border-gray-400 h-10 pl-3 w-full"
              />
            </div>
            <div className="flex space-x-4 justify-between items-center flex-grow w-full mb-4">
              <input
                type="email"
                placeholder="email"
                required="required"
                name="email"
                onChange={handleChange}
                className="w-1/2 text-xs md:text-base font-light outline-none border-1 border-gray-400 h-10 pl-3"
              />
              <input
                type="tel"
                placeholder="phone no"
                required="required"
                name="phone"
                onChange={handleChange}
                className="w-1/2 font-light outline-none border-1 border-gray-400 h-10 pl-3"
              />
            </div>
            <div className="flex space-x-4 justify-between items-center flex-grow w-full mb-4">
              <input
                type="password"
                placeholder="password"
                required="required"
                name="password"
                onChange={handleChange}
                className="w-1/2 font-light outline-none border-1 border-gray-400 h-10 pl-3"
              />
              <input
                type="password"
                placeholder="confirm password"
                required="required"
                name="confirmPassword"
                onChange={handleChange}
                className="w-1/2 font-light outline-none border-1 border-gray-400 h-10 pl-3"
              />
            </div>
            <p className="text-sm text-start mb-4 text-gray-100">
              <input
                type="checkbox"
                onClick={() => setcheckBox(!checkBox)}
                className="mr-2 pt-1 h-4 w-4"
              />
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>{" "}
            </p>

            <button
              disabled={!checkBox}
              className="self-start disabled:opacity-40 disabled:hover:bg-teal-600 disabled:active:scale-100 outline-green-700 h-10 w-20 bg-teal-600 text-white hover:bg-teal-700 active:scale-90 transform transition duration-150 ease-in"
              onClick={handleRegister}
            >
              CREATE
            </button>
          </form>
          <Link
            to="/login"
            className="text-white text-[0.8rem] cursor-pointer"
            // onClick={RedirectLoginHandler}
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Register;
