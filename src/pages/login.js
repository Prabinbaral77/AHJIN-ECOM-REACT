import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { ToastsContainer, ToastsStore } from "react-toasts";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const loginUrl = "http://0.0.0.0:8000/api/user/login/";

    await axios
      .post(loginUrl, {
        email: formData?.email,
        password: formData?.password,
      })
      .then((res) => {
        localStorage.setItem("userDetails", JSON.stringify(res.data));
        localStorage.setItem("isUserPresent", true);
        const accessToken = res?.data?.access_token;
        axios
          .get("http://0.0.0.0:8000/api/user/detail/", {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            if (res.data.is_admin) {
              navigate("/admin");
            } else {
              navigate("/");
            }
          });
      })
      .catch((error) => {
        ToastsStore.success("Something went wrong !");
        console.log(error.response?.data);
      });
  };

  return (
    <main>
      <Navbar />
      <div
        className="w-full h-screen bg-no-repeat bg-cover bg-right flex items-center pt-20 justify-center"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/1166644/pexels-photo-1166644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        }}
      >
        <div className=" md:w-[33.33%] w-full mx-3 py-10 flex-col space-y-4 bg-gray-800 rounded-lg shadow-2xl shadow-gray-600 flex items-center justify-center px-4 ">
          <h1 className="mt-4 self-start text-3xl font-extralight text-gray-100">
            SIGN IN
          </h1>
          <input
            type="email"
            placeholder="email"
            required="required"
            name="email"
            onChange={handleChange}
            className="w-full font-light outline-none border-1 border-gray-400 h-10 pl-3"
          />
          <input
            type="password"
            placeholder="password"
            required="required"
            name="password"
            onChange={handleChange}
            className="w-full font-light outline-none border-1 border-gray-400 h-10 pl-3"
          />

          <button
            className="self-start h-10 w-20 bg-teal-600 text-white hover:bg-teal-700 active:scale-90 transform transition duration-150 ease-in "
            onClick={loginHandler}
          >
            LOGIN
          </button>
          <Link className="self-start" to={'/user/enter-email'}>
          <p className=" cursor-pointer text-sm font-light text-gray-100">
            FORGET PASSWORD?
          </p>
          </Link>
          <p
            className="self-start cursor-pointer text-sm font-light text-gray-100"
            // onClick={createNewAccoutHandler}
          >
            CREATE A NEW ACCOUNT
          </p>
        </div>
      </div>
      <ToastsContainer store={ToastsStore} />
    </main>
  );
}

export default Login;
