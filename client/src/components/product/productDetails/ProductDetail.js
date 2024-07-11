import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../../redux/features/product/productSlice";
import styles from "./ProductDetails.module.scss";
import LoadingGif from "../../../image/loading/spinner.gif";
import { calculateAverageRating } from "../../../utils";
import ProductRating from "../productRating/ProductRating";
import DOMPurify from "dompurify";
import toast from "react-hot-toast";
import Card from "../../cards/Card";
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, DECREASE_CART, saveCartDB, selectCartItems } from "../../../redux/features/cart/cartSlice";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [imageIndex, setImageIndex] = useState(0);
  const { product, isLoading } = useSelector((state) => state.product);
  const cartItems = useSelector(selectCartItems);


  const cart = cartItems?.find((cart) => cart._id === id);
  const isCartAdded = cartItems?.findIndex((cart) => cart._id === id)

  const averageRating = calculateAverageRating(product?.ratings);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const slideLength = product?.photo?.length;
  const nextSlide = () => {
    setImageIndex(imageIndex === slideLength - 1 ? 0 : imageIndex + 1);
  };

  let slideInterval;

  useEffect(() => {
    if (product?.photo?.length) {
      const autoImage = () => {
        slideInterval = setInterval(nextSlide, 2000);
      };
      autoImage();
    }
    return () => clearInterval(slideInterval);
  }, [imageIndex, slideInterval, product]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product))
    dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) 
      })
    );
  }
  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product))
    dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) 
      })
    );
  }

  // useEffect(() => {
  //   dispatch(CALCULATE_TOTAL_QUANTITY())
  // }, [])

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <div>
          <Link to="/shop">&larr;</Link>
        </div>
        <h5>Product Details</h5>
      </div>

      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <img style={{ width: "100px" }} src={LoadingGif} alt="loading.." />
        </div>
      ) : (
        <>
          <div className={styles.details}>
            <div className={styles.img}>
              <img
                src={product?.photo[imageIndex]}
                alt={product?.name}
                className={styles.pImg}
              />
              <div className={styles.smallImage}>
                {product?.photo.map((img, index) => {
                  return (
                    <img
                      src={img}
                      className={imageIndex === index ? "activeImg" : ""}
                      key={index}
                      alt="product"
                      onClick={() => setImageIndex(index)}
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles.content}>
              <h5>{product?.name}</h5>

              <ProductRating
                averageRating={averageRating}
                noOfRating={product?.ratings?.length}
              />
              <div className="--underline"></div>
              <div className={styles.property}>
                <p>
                  <b>Price:</b>
                </p>
                <p className={styles.price}>
                  {product?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </p>
              </div>
              <div className={styles.property}>
                <p>
                  <b>SKU:</b>
                </p>
                <p>{product?.sku}</p>
              </div>
              <div className={styles.property}>
                <p>
                  <b>Category:</b>
                </p>
                <p>{product?.category}</p>
              </div>
              <div className={styles.property}>
                <p>
                  <b>Brand:</b>
                </p>
                <p>{product?.brand}</p>
              </div>
              <div className={styles.property}>
                <p>
                  <b>Color:</b>
                </p>
                <p>{product?.color}</p>
              </div>
              <div className={styles.property}>
                <p>
                  <b>Quantity in stock:</b>
                </p>
                <p>{product?.quantity}</p>
              </div>
              <div className={styles.property}>
                <p>
                  <b>Sold:</b>
                </p>
                <p>{product?.sold}</p>
              </div>

              {isCartAdded < 0 ? null : (
                <>
                <div className={styles.count}>
                  <button 
                    className="--btn"
                    onClick={() => decreaseCart(product)}
                  >
                    -
                  </button>
                  <p>
                    <b>{cart?.cartQuantity}</b>
                  </p>
                  <button 
                    className="--btn"
                    onClick={() => addToCart(product)}
                  >
                    +
                  </button>
                </div>
                </>
              )}
              <div className="--flex-start">
                {product?.quantity > 0 ? (
                  <button 
                    className="--btn --btn-primary"
                    onClick={() => addToCart(product)}
                  >
                    ADD TO CART
                  </button>
                ) : (
                  <button
                    className="--btn --btn-danger"
                    onClick={() =>
                      toast.error("Sorry, Product is out of stock")
                    }
                  >
                    OUT OF STOCK
                  </button>
                )}
                <button className="--btn --btn-danger">ADD TO WISHLIST</button>
              </div>
              <div className="--underline"></div>
              <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product?.description
                ),
              }}
            ></div>
            </div>
          </div>
        </>
      )}
      {/* Product review */}
      <Card cardClass={styles.card}>
        <h5>Product reveiw??</h5>
      </Card>
    </section>
  );
}
