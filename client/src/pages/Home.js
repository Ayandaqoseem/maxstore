import Banner from "../components/homeCard/Banner";
import HomeInfoBox from "../components/homeCard/homeInfoBox/HomeInfoBox";
import { useEffect, useState } from "react";
import LoadingGif from "../image/loading/spinner.gif";
import ProductCarousel from "../components/carousel/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/features/product/productSlice";
import CarouselItem from "../components/carousel/CarouselItem";
import FooterLinks from "../components/footer/FooterLinks";
import { Link } from "react-router-dom";
// import { useAuth } from "../context/auth";
import { ADD_TO_CART, saveCartDB } from "../redux/features/cart/cartSlice";

export default function Home() {
  const { products, product, isLoading } = useSelector(
    (state) => state.product
  );
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const latest = products
    ?.filter((item, index) => {
      return item.quantity > 0;
    })
    ?.filter((item, index) => index < 10);

  const footwear = products
    ?.filter((item) => {
      return item.quantity > 0;
    })
    ?.filter((item, index) => {
      return item.category === "Footwear";
    })
    ?.filter((item, index) => index < 6);

  const phones = products
    ?.filter((item) => {
      return item.quantity > 0;
    })
    ?.filter((item, index) => {
      return item.category === "Phone";
    })
    ?.filter((item, index) => index < 6);

  const shirt = products
    ?.filter((item) => {
      return item.quantity > 0;
    })
    ?.filter((item, index) => {
      return item.category === "Shirt";
    })
    ?.filter((item, index) => index < 6);

  const flashProducts = products
    ?.filter((item) => {
      return item.quantity > 0;
    })
    ?.filter((item, index) => {
      return item.regularPrice < 100000;
    })
    ?.filter((item, index) => index < 6);

  const sortedBySold = products
    ?.filter((item) => item.quantity > 0)
    ?.sort((a, b) => b.sold - a.sold)
    ?.slice(0, 6);

  // const sortedProducts = sortedBySold.map((item) => (
  //   <div key={item._id} className="d-flex">

  //       name={item.name}
  //       url={item.photo[0]}
  //       price={item.price}
  //       regularPrice={item.regularPrice}
  //       description={item.description}

  //   </div>
  // ));

  const latestProducts = latest.map((item) => (
    <div key={item._id}>
      <CarouselItem
        name={item.name}
        url={item.photo[0]}
        price={item.price}
        regularPrice={item.regularPrice}
        description={item.description}
        quantity={item.quantity}
        product={item}
      />
    </div>
  ));

  const footwearProducts = footwear.map((item) => (
    <div key={item._id}>
      <CarouselItem
        name={item.name}
        url={item.photo[0]}
        price={item.price}
        regularPrice={item.regularPrice}
        description={item.description}
        quantity={item.quantity}
        product={item}
      />
    </div>
  ));

  const phoneProducts = phones.map((item) => (
    <div key={item._id}>
      <CarouselItem
        name={item.name}
        url={item.photo[0]}
        price={item.price}
        regularPrice={item.regularPrice}
        description={item.description}
        quantity={item.quantity}
        product={item}
      />
    </div>
  ));

  const shirtProducts = shirt.map((item) => (
    <div key={item._id}>
      <CarouselItem
        name={item.name}
        url={item.photo[0]}
        price={item.price}
        regularPrice={item.regularPrice}
        description={item.description}
        quantity={item.quantity}
        product={item}
      />
    </div>
  ));

  const allProducts = products.map((item) => (
    <div key={item._id}>
      <CarouselItem
        name={item.name}
        url={item.photo[0]}
        price={item.price}
        regularPrice={item.regularPrice}
        description={item.description}
        quantity={item.quantity}
        product={item}
      />
    </div>
  ));

  const PageHeading = ({ heading, btnText }) => {
    return (
      <>
        <div className="d-flex justify-content-between">
          <h4>{heading}</h4>
          <button className="btn">{btnText}</button>
        </div>
        <hr style={{ width: "100%" }} />
      </>
    );
  };

  const addToCart = (item) => {
    dispatch(ADD_TO_CART(item));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItem")) })
    );
  };

  return (
    <>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <img style={{ width: "100px" }} src={LoadingGif} alt="loading.." />
        </div>
      ) : (
        <div className="homeSection">
          <div className="BannerPart">
            <Banner />
          </div>
          <section>
            <div className="mt-4 sectionContainer">
              <HomeInfoBox />
              <PageHeading
                heading={"Latest Products"}
                btnText={"Shop Now >>>"}
              />
              <ProductCarousel products={latestProducts} />
            </div>
          </section>

          <div className="mt-4 -sectionContainer">
            <PageHeading heading={"Best Sellers"} btnText={"Shop Now >>>"} />
          </div>
          <div className="section-Container">
            <div className="mt-4 p-4 bestSeller-container-wrapper">
              <div className="d-flex bestSeller-wrapper">
                {sortedBySold.map((item) => (
                  <div key={item._id} className="bestSeller-carouselItem">
                    <Link to={`/product-details/${item._id}`}>
                      <img
                        className="product--image"
                        src={item.photo[0]}
                        alt={item.name}
                      />
                      <p className="price">
                        <span>
                          {item.regularPrice > 0 && (
                            <del>
                              {item.regularPrice?.toLocaleString("en-US", {
                                style: "currency",
                                currency: "NGN",
                              })}
                            </del>
                          )}
                        </span>
                        <br />
                        {item.price?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "NGN",
                        })}
                      </p>
                      <p>{item.name?.substring(0, 16)}...</p>
                      {/* <p className="--mb">{desc?.substring(0, 26)}...</p> */}
                    </Link>
                    <button
                      className="--btn --btn-primary --btn-block"
                      onClick={() => addToCart(item)}
                    >
                      Add To Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {footwearProducts.length === 4 && (
            <section>
              <div className="mt-4 sectionContainer">
                <PageHeading heading={"Footwears"} btnText={"Shop Now >>>"} />
                <ProductCarousel products={footwearProducts} />
              </div>
            </section>
          )}

          {phoneProducts.length === 4 && (
            <section>
              <div className="mt-4 sectionContainer">
                <PageHeading
                  heading={"Mobile Phones"}
                  btnText={"Shop Now >>>"}
                />
                <ProductCarousel products={phoneProducts} />
              </div>
            </section>
          )}

          <div className="section-Container--">
            <div className="-sectionContainer--">
              <PageHeading heading={"Flash Sales"} btnText={"Shop Now >>>"} />
            </div>
            <div className="mt-4 p-4 bestSeller-container-wrapper">
              <div className="d-flex bestSeller-wrapper">
                {flashProducts.map((item) => (
                  <div key={item._id} className="bestSeller-carouselItem">
                    <Link to={`/product-details/${item._id}`}>
                      <img
                        className="product--image"
                        src={item.photo[0]}
                        alt={item.name}
                      />
                      <p className="price">
                        <span>
                          {item.regularPrice > 0 && (
                            <del>
                              {item.regularPrice?.toLocaleString("en-US", {
                                style: "currency",
                                currency: "NGN",
                              })}
                            </del>
                          )}
                        </span>
                        <br />
                        {item.price?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "NGN",
                        })}
                      </p>
                      <p>{item.name?.substring(0, 16)}...</p>
                      {/* <p className="--mb">{desc?.substring(0, 26)}...</p> */}
                    </Link>
                    <button
                      className="--btn --btn-primary --btn-block"
                      onClick={() => addToCart(item)}
                    >
                      Add To Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {shirtProducts.length === 4 && (
            <section>
              <div className="mt-4 sectionContainer">
                <PageHeading heading={"Shirt"} btnText={"Shop Now >>>"} />
                <ProductCarousel products={shirtProducts} />
              </div>
            </section>
          )}

          <section>
            <div className="mt-4 sectionContainer">
              <PageHeading heading={"Products"} btnText={"Shop Now >>>"} />
              <ProductCarousel products={allProducts} />
            </div>
          </section>
        </div>
      )}
      <FooterLinks />
    </>
  );
}
