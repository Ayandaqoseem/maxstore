import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingGif from "../../../image/loading/spinner.gif";
import styles from "./ChangeOrderStatus.module.scss";
import Card from "../../../components/cards/Card";
import { useParams } from "react-router-dom";
import { updateOrderStatus } from "../../../redux/features/order/orderSlice";

export default function ChangeOrderStatus() {
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const { isLoading } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const updateStatus = async (e, id) => {
    e.preventDefault();
    const formData = {
      orderStatus: status,
    };
    await dispatch(updateOrderStatus({ id, formData }));
  };
  return (
    <div>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "10vh" }}
        >
          <img style={{ width: "90px" }} src={LoadingGif} alt="loading.." />
        </div>
      ) : (
        <div className={styles.status}>
          <Card cardClass={styles.card}>
            <h5>Update Status</h5>
            <form onSubmit={(e) => updateStatus(e, id)}>
              <span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" disabled>
                    -- Choose one --
                  </option>
                  <option value="Order Placed...">Order Placed...</option>
                  <option value="Processing...">Processing...</option>
                  <option value="Shipped...">Shipped...</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </span>
              <span>
                <button type="submit" className="--btn --btn-primary">
                  Update Status
                </button>
              </span>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
