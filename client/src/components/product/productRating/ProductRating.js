import StarRating from "react-star-ratings"


export default function ProductRating({ averageRating, noOfRating }) {
  return (
    <>
      {averageRating > 0 && (
        <>
          <StarRating
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="#F6B01E" 
            rating={averageRating}
            editing={false}
          />
          {noOfRating}
        </>
      )}
    </>
  );
}
