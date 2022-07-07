import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Slider({img1,img2,img3}) {
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
          src={img1}
          className="md:h-full object-cover"
          alt=""
        />
      </div>

      <div className="md:h-[680px] h-[300px]">
        <img
          src={img2}
          className="md:h-full object-cover"
          alt=""
        />
      </div>

      <div className="md:h-[680px] h-[300px]">
        <img
          src={img3}
          className="md:h-full object-cover"
          alt=""
        />
      </div>
    </Carousel>
  );
}

export default Slider;
