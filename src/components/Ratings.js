import React from 'react'
import StarRatings from "react-star-ratings";
import ProgressBar from 'react-bootstrap/ProgressBar';

function Ratings({reviews,averageRating}) {
    
    const ratingArray = reviews.map((m)=>{
        return m.rating
    })

    const oneArr = ratingArray.filter((f)=>{
        return f === 1
      })
      const threeArr = ratingArray.filter((f)=>{
        return f === 3
      })
      const fiveArr = ratingArray.filter((f)=>{
        return f === 5
      })
      const twoArr = ratingArray.filter((f)=>{
        return f === 2
      })
      const fourArr = ratingArray.filter((f)=>{
        return f === 4
      })

      const onePercent = (oneArr.length?oneArr.length/reviews.length:0) * 100
      const twoPercent = (twoArr.length?twoArr.length/reviews.length:0) * 100
      const threePercent = (threeArr.length?threeArr.length/reviews.length:0) * 100
      const fourPercent = (fourArr.length?fourArr.length/reviews.length:0) * 100
      const fivePercent = (fiveArr.length?fiveArr.length/reviews.length:0) * 100
  return (
    <div className="h-24 max-w-6xl mx-auto lg:absolute right-10 top-[1750px] mb-32 lg:mb-0   flex flex-col space-y-6 px-4  lg:px-0">
        <h1 className="text-2xl text-cyan-100 font-bold font-mono">Customer reviews</h1>
        <div className="flex items-center space-x-3 ">
        <StarRatings
              rating={averageRating?averageRating :1}
              starRatedColor="goldenrod"
              readonly={true}
              starDimension="25px"
              starSpacing="2px"
            />
            <p className="text-cyan-300 font-semibold pt-2">{`${averageRating?averageRating:0} out of 5`}</p>
        </div>
            <p className="text-gray-300 text-xs">{reviews?.length} global ratings</p>

            <div className="w-80  flex flex-col space-y-6 ">
             <div className="flex items-center space-x-2 w-full">
                <p className="text-cyan-100 text-xs">1 star</p>
             <ProgressBar className="flex-1"  now={onePercent}  variant="danger" label={`${onePercent}%`} />
             </div>
             <div className="flex items-center space-x-2 w-full">
                <p className="text-cyan-100 text-xs">2 star</p>
                <ProgressBar className="flex-1"  now={twoPercent}  variant="danger" label={`${twoPercent}%`} />
             </div>
             <div className="flex items-center space-x-2 w-full">
                <p className="text-cyan-100 text-xs">3 star</p>
                <ProgressBar className="flex-1"  now={threePercent}  variant="danger" label={`${threePercent}%`} />
             </div>
             <div className="flex items-center space-x-2 w-full">
                <p className="text-cyan-100 text-xs">4 star</p>
                <ProgressBar className="flex-1"  now={fourPercent}  variant="danger" label={`${fourPercent}%`} />
             </div>
             <div className="flex items-center space-x-2 w-full">
                <p className="text-cyan-100 text-xs">5 star</p>
                <ProgressBar className="flex-1" now={fivePercent}  variant="danger" label={`${fivePercent}%`} />
             </div>
            </div>
       </div>
  )
}

export default Ratings