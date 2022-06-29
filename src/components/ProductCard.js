import React from "react";
import StarRatings from "react-star-ratings";
import classes from "./component.module.css";
import { Link } from "react-router-dom";
// import { ahjinCoinCalculator } from "../utils/ahjinCoinCalculator";

function ProductCard() {
  const stock = true;
  return (
    <Link
      to="/product/productId"
      className="lg:w-[280px] w-[195px] h-auto bg-slate-800  rounded-md cursor-pointer shadow-sm shadow-gray-100/70 lg:hover:scale-105 transition-transform duration-700 delay-300 ease-in-out"
    >
      <div className="w-full lg:h-40 h-32 relative">
        <img
          src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
          className={` ${classes.productCard}`}
          alt="product"
        />
      </div>

      <section className="w-full  px-3 flex flex-col justify-center space-y-1 py-4">
        <h1 className="text-gray-100 font-Roboto lg:text-sm text-xs font-semibold transition-colors duration-500 cursor-pointer ">
          J.Fisher Piping T-shirt For Men
        </h1>
        <div className="flex items-center space-x-1">
          <StarRatings
            rating={4.5}
            starRatedColor="goldenrod"
            readonly={true}
            starDimension="12px"
            starSpacing="2px"
          />
          <p className="text-gray-500  text-xs mt-1 tracking-widest cursor-pointer hover:text-orange-400 transition-colors">
            (1)
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full ">
          <p className="text-gray-100  font-semibold lg:text-sm text-xs font-Roboto  tracking-widest">
            Rs. 250
          </p>
          <p className="text-gray-100 font-semibold lg:text-sm text-xs font-Roboto  tracking-widest">
            100 AC
          </p>
          <p className="text-gray-400 line-through text-xs "> Rs. 100</p>
        </div>
        {!stock && (
          <p className="text-xs text-red-600  ">
            Only 4 left in stock - order soon.
          </p>
        )}
        {stock && (
          <p className="text-xs text-green-600  ">Available now in stock</p>
        )}
      </section>
    </Link>
  );
}

export default ProductCard;
