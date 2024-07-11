import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_TO_CART, saveCartDB } from "../../redux/features/cart/cartSlice";

function removeHTMLTags(input) {
  const regex = /<[^>]+>/g;
  return input.replace(regex, "");
}

export default function CarouselItem({ 
    url, 
    name, 
    price, 
    description,
    regularPrice,
    quantity,
    product
 }) {
  const dispatch = useDispatch();
  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems"))}))

  }
  const desc = removeHTMLTags(description);
  return (
    <div className="carouselItem">
      <Link to={`/product-details/${product._id}`}>
        <img className="product--image" src={url} alt="product" />
        <p className="price">
          <span>{regularPrice > 0 && 
            <del>
                {regularPrice?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "NGN",
                })}
            </del>}</span><br />
          {price?.toLocaleString("en-US", {
            style: "currency",
            currency: "NGN",
          })}
        </p>
        <h5>{name?.substring(0, 16)}...</h5>
        <p className="--mb-carousel">{desc?.substring(0, 18)}...</p>
      </Link>
      {quantity > 0 ? (
        <button 
          className="--btn --btn-primary --btn-block"
          onClick={() => addToCart(product)}
        >
          Add To Cart
        </button>
      ) : (
        <button 
        className="--btn --btn-danger --btn-block"
        onClick={() => toast.error("Sorry, Product out of stock.")}
      >Out of stock</button>
      )}
    </div>
  );
}
