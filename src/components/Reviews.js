import React, { useState } from "react";

import StarRatings from "react-star-ratings";
import { Offcanvas } from "react-bootstrap";
import TimeAgo from "timeago-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";


function Reviews({ reviews, setrunUseEffect, runUseEffect }) {

  const item = JSON.parse(localStorage.getItem("userDetails"));
  const access_token = item?.access_token;

  const handleDeleteReview = async(id) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      setrunUseEffect(runUseEffect + 1);
    toast.success("Review Deleted", {id:"delete_toast"})
    } catch (error) {
      toast.error("Error deleting review", {id:"delete_toast"})
      console.log(error);
    }
  
  };

  const userDetails = JSON.parse(localStorage.getItem("userDetails")).user;

  console.log(userDetails?.username);
  const [sliceNumber, setsliceNumber] = useState(5);
  const [show, setShow] = useState(false);

  const [editId, seteditId] = useState("");
  const [starRating, setstarRating] = useState(0);
  const [review, setreview] = useState("");

  const handleMoreReviews = () => {
    setsliceNumber(sliceNumber + 5);
  };
  const handleClose = () => setShow(false);

  const handleLessReviews = () => {
    setsliceNumber(5);
  };
  const handleEditReview = (id, rate, review) => {
    setShow(true);
    setstarRating(rate);
    setreview(review);
    seteditId(id);
  };

  const changeRating = (rate) => {
    setstarRating(rate);
  };

  const handleEditReviewSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8000/api/products/reviews/${editId}`, {
        comment: review,
        rating: starRating,
      },{
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      setrunUseEffect(runUseEffect + 1);
      handleClose();
      toast.success("Review edited.")
    } catch (error) {
      console.log(error);
      toast.error("Error editing review.")
    }
  };


  return (
    <div className="lg:px-4 ">
       <Toaster position="top-center" reverseOrder={false} />
            <h1 className="text-cyan-500 my-4 ml-8 font-semibold border-b max-w-fit animate-pulse border-cyan-500 text-xl tracking-widest">Customer Reviews</h1>
      <div
        id="#componentToScrollTo"
        className={
          "flex flex-col  transition-all text-white    justify-center items-center font-Lora mb-4"
        }
      >
          
        {reviews.slice(0, sliceNumber).map((r) => (
          <div
            key={r.id}
            className="flex md:flex-row pr-3 flex-col  lg:space-x-3 space-x-0 space-y-3 lg:space-y-0  pb-2  justify-between lg:items-center items-start mt-8 mb-4   h-auto w-screen   px-4"
          >
            <div className="flex items-center w-48 ml-4 md:mt-0 mt-2 md:mb-0 mb-2  h-full  space-x-2">
              <img
                className="h-10  bg-black  w-10 rounded-full object-cover object-top"
                src={`https://avatars.dicebear.com/api/adventurer/${r.user}.svg`}
                alt=""
              />


              <h1 className="font-bold text-sm ">{r.user}</h1>
            </div>
            <p className=" w-[90%]   md:w-[60%]  h-auto mx-4 mt-2 text-xs text-justify">
              {r.comment}
            </p>

            <div className="flex flex-col w-72 pr-4 mt-2   items-center justify-between  ">
              <div className="flex items-center w-[80%]     md:w-full space-x-3  md:justify-evenly">
                <span className="mb-3 ">
                  <StarRatings
                    rating={r.rating}
                    starRatedColor="goldenrod"
                    readonly={true}
                    starDimension="15px"
                    starSpacing="2px"
                  />
                
                </span>
                <p className="  mb-3  text-xs">
                  <TimeAgo datetime={r.createdAt} />
                </p>
              </div>

              <div className="flex items-center lg:justify-center  w-full pl-7 space-x-2">
                {userDetails?.username == r?.user && (
                  <p
                    onClick={() => handleDeleteReview(r.id)}
                    className="text-red-600  mb-3 font-bold text-xs underline cursor-pointer hover:text-red-700 active:scale-90 duration-300 transform transition ease-out "
                  >
                    Delete
                  </p>
                )}

                {userDetails?.username == r?.user && (
                  <p
                    onClick={() =>
                      handleEditReview(r.id, r.rating, r.comment)
                    }
                    className="text-green-600  mb-3 font-bold text-xs underline cursor-pointer hover:text-green-700 active:scale-90 duration-300 transform transition ease-out "
                  >
                    Edit
                  </p>
                )}
                
              </div>
            </div>
          </div>
        ))}
      </div>

      <Offcanvas
        className="bg-gradient-to-r from-black to-gray-800 font-Lora w-[700px] "
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-yellow-600 font-bold border-yellow-600 border-b-2">
            Edit Your Review
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form onSubmit={handleEditReviewSubmit}>
            <h1 className="my-2 ml-2 font-bold text-white">Rate:</h1>
            <StarRatings
              rating={starRating}
              starRatedColor="goldenrod"
              starHoverColor="goldenrod"
              starEmptyColor="gray"
              changeRating={changeRating}
              numberOfStars={5}
              starDimension="30px"
              name="rating"
            />

            <textarea
              value={review}
              onChange={(e) => setreview(e.target.value)}
              name=""
              id=""
              cols="30"
              rows="10"
              className="border-2 w-full my-4 bg-gray-200 text-sm p-2 rounded-lg pl-2 outline-none"
              placeholder="Your updated review here.."
            ></textarea>

            <button
              type="submit"
              disabled={review === ""}
              className="bg-black border text-white hover:scale-105 transition duration-300 p-2 rounded-lg text-sm "
            >
              Edit
            </button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
      {sliceNumber > 5 && sliceNumber >= reviews.length ? (
        <p
          onClick={handleLessReviews}
          className={`text-blue-500 underline cursor-pointer text-sm font-Lora my-3 mx-3  hover:text-blue-600`}
        >
          see less reviews
        </p>
      ) : (
        <p
          onClick={handleMoreReviews}
          className={
            reviews.length > 5
              ? `text-blue-500 hover:text-blue-600 underline cursor-pointer text-sm font-Lora my-3 mx-3 `
              : "hidden"
          }
        >
          see more reviews
        </p>
      )}
    </div>
  );
}

export default Reviews;
