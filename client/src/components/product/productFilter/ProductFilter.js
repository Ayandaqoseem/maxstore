import { useEffect, useState } from "react";
import styles from "./ProductFilter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/features/product/FilterSlice";
import { GET_PRICE_RANGE } from "../../../redux/features/product/productSlice";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function ProductFilter() {
  const { products, minPrice, maxPrice } = useSelector(
    (state) => state.product
  );

  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState([50, 2000]);

  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products?.map((product) => product.category)),
  ];

  const allBrands = [
    "All",
    ...new Set(products?.map((product) => product.brand)),
  ];

  const filterProductCategory = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  useEffect(() => {
    dispatch(GET_PRICE_RANGE({ products }));
  }, [dispatch, products]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }))
  }, [dispatch, products, price]);

  const clear = () => {
    setCategory("All")
    setBrand("All")
    setPrice([minPrice, maxPrice])
  }

  return (
    <div className={styles.filter}>
      <h5>Categories</h5>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => filterProductCategory(cat)}
            >
              &#8250; {cat}
            </button>
          );
        })}
      </div>

      <div className={styles.brand}>
        <h5>Brands</h5>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>
      <h5>Price</h5>
      <div className={styles.price}>
        <Slider 
          range
          marks={{
            1: `${price[0]}`,
            1000: `${price[1]}`,
          }}
          min={minPrice}
          max={maxPrice}
          defaultValue={[minPrice, maxPrice]}
          tipFormatter ={(value) => `$${value}`}
          tipProps = {{
            placement: "top",
            visible: true,
          }}
          value={price}
          onChange={(price) => setPrice(price)}
        />
      </div>
      <br />
      <br />
      <br />
      <button
        className="--btn --btn-danger" 
        onClick={() => clear()}
      >
        Clear Filter
      </button>
    </div>
  );
}
