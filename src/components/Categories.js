import React from "react";
import { Fade } from "react-reveal";

function Categories() {
  return (
    <Fade>
      <div className="max-w-screen  h-auto mx-auto py-10 flex flex-col lg:flex-row  space-y-4 lg:space-y-0 px-4  bg-[#1E293B] ">
        <section
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/3412313/pexels-photo-3412313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="h-[600px] lg:w-1/3 w-full flex items-center justify-center shadow-lg shadow-cyan-900 "
        >
          <div className="flex flex-col space-y-4 items-center justify-center bg-black/40 h-full w-full">
            <h1 className="text-gray-100 font-bold text-4xl font-Roboto uppercase">
              Electronics
            </h1>
            <a href={"/categories/electronics"}>
              <button className="bg-cyan-600  px-4 py-2  text-gray-100 hover:bg-cyan-700 transition-all duration-300">
                Shop Now
              </button>
            </a>
          </div>
        </section>
        <section
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="h-[600px] lg:w-1/3 w-full flex items-center justify-center shadow-lg shadow-cyan-900 "
        >
          <div className="flex flex-col space-y-8 items-center justify-center bg-black/40 h-full w-full">
            <h1 className="text-gray-100 font-extrabold text-4xl font-mono opacity-100 drop-shadow-2xl">
              CLOTHES
            </h1>
            <a href={"/categories/clothes"}>
              <button className="bg-cyan-600  px-4 py-2  text-gray-100 hover:bg-cyan-700 transition-all duration-300">
                Shop Now
              </button>
            </a>
          </div>
        </section>
        <section
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="h-[600px] lg:w-1/3 w-full flex items-center justify-center shadow-lg shadow-cyan-900  "
        >
          <div className="flex flex-col space-y-8 items-center justify-center bg-black/40 h-full w-full">
            <h1 className="text-gray-100 font-bold text-4xl font-mono opacity-100">
              OTHERS
            </h1>
            <a href={"/categories/others"}>
              <button className="bg-cyan-600 py-2 max-w-fit px-4 text-gray-100 hover:bg-cyan-700 transition-all duration-300">
                Shop Now
              </button>
            </a>
          </div>
        </section>
      </div>
    </Fade>
  );
}

export default Categories;
