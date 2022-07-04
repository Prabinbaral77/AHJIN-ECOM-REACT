import React from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import { ahjinCoinCalculator } from "../utils/ahjinCoinCalculator";

function ProductCard({ img, name, price_m, price_a, discount, rating, id }) {
  const stock = true;

  return (
    <Link
      to={`/product/${id}`}
      className="lg:w-[280px] w-[195px] h-auto bg-slate-800  rounded-md cursor-pointer shadow-md shadow-cyan-100/40 lg:hover:scale-105 transition-transform duration-700 delay-300 ease-in-out"
    >
      <img
        src={img}
        layout={"fill"}
        className="object-cover h-40 w-full"
        alt="product"
      />

      <section className="w-full  px-3 flex flex-col justify-center space-y-1 py-4">
        <h1 className="text-gray-100 font-Roboto lg:text-sm text-xs font-semibold transition-colors duration-500 cursor-pointer ">
          {name}
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
            Rs. {price_m - price_m * (discount / 100)}
          </p>
          <p className="text-gray-100 font-semibold lg:text-sm text-xs font-Roboto  tracking-widest">
            {ahjinCoinCalculator(price_m - price_m * (discount / 100))} AC
          </p>
          <p className="text-gray-400 line-through text-xs "> Rs. {price_m}</p>
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
