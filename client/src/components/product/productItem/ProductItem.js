import Card from "../../cards/Card";
import { Link } from "react-router-dom";
import styles from "./ProductItem.module.scss";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import ProductRating from "../productRating/ProductRating";
import { calculateAverageRating } from "../../../utils";
import { useDispatch } from "react-redux";
import { ADD_TO_CART, saveCartDB } from "../../../redux/features/cart/cartSlice";

export default function ProductItem({
  product,
  grid,
  _id,
  name,
  price,
  photo,
  regularPrice,
}) {
  const averageRating = calculateAverageRating(product.ratings)

  const dispatch = useDispatch();


  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product))
    dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems"))
  })
  )
  }

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${_id}`}>
        <div className={styles.img}>
          <img src={photo[0]} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p className={styles.textP}>
            <span>
              {regularPrice > 0 && (
                <del>
                  {regularPrice?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </del>
              )}
            </span>
            {price?.toLocaleString("en-US", {
              style: "currency",
              currency: "NGN",
            })}
          </p>
          <ProductRating 
            averageRating={averageRating}
            noOfRating={product?.ratings?.length}
          />
          <h6>{name?.substring(0, 10)}...</h6>

          {!grid && (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.description.substring(0, 18)
                ),
              }}
            ></div>
          )}

          {product?.quantity > 0 ? (
            <button 
              className="--btn --btn-primary"
              onClick={() => addToCart(product)}
            >Add To Cart</button>
          ) : (
            <button
              className="--btn --btn-danger"
              onClick={() => toast.error("Sorry, Product is out of stock")}
            >
              Out of stock
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
