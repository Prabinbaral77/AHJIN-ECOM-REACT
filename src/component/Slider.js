import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Slider() {
  return (
    <Carousel
      dynamicHeight={true}
      infiniteLoop={true}
      swipeable={true}
      autoPlay={true}
      className="bg-[#1E293B]"
    >
      <div className="md:h-[680px] ">
        <img
          src="https://images.pexels.com/photos/168765/pexels-photo-168765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="md:h-full object-cover"
          alt=""
        />
      </div>

      <div className="md:h-[680px] h-[300px]">
        <img
          src="https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="md:h-full object-cover"
          alt=""
        />
      </div>

      <div className="md:h-[680px] h-[300px]">
        <img
          src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="md:h-full object-cover"
          alt=""
        />
      </div>
    </Carousel>
  );
}

export default Slider;
