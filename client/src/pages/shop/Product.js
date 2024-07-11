import { useEffect, useState } from "react";
import styles from "./Product.module.scss";
import { useDispatch, useSelector } from "react-redux";
import LoadingGif from "../../image/loading/spinner.gif";
import { getProducts } from "../../redux/features/product/productSlice";
import ProductFilter from "../../components/product/productFilter/ProductFilter";
import ProductList from "../../components/product/productList/ProductList";
import { FaCog } from "react-icons/fa";

export default function Product() {
  const [showFilter, setShowFlter] = useState(false);
  const { isLoading, products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const toggleFilter = () => {
    setShowFlter(!showFilter);
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "80vh" }}
            >
              <img
                style={{ width: "100px" }}
                src={LoadingGif}
                alt="loading.."
              />
            </div>
          ) : (
            <ProductList products={products} />
          )}
          <div className={styles.icon} onClick={toggleFilter}>
            <FaCog size={20} color="orangered" className={styles["faCog-img"]} />
            <p>
              <b>{showFilter ? "Hide Flter" : "Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
