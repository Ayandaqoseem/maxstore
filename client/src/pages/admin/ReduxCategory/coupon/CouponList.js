import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingGif from "../../../../image/loading/spinner.gif";
import { deleteCoupon, getCoupon, getCoupons } from "../../../../redux/features/coupon/couponSlice";
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function CouponList() {
  const { isLoading, coupons } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons());
    // dispatch(getCoupon("HAFSOH"));
  }, [dispatch]);


  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Coupon",
      message: "Are you sure you want to delete this coupon?",
      buttons: [
        {
          label: "Delete",
          onClick: () => handleDelete(id),

        },
        {
          label: "Cancel",
        },
      ],
    });
  };


  const handleDelete = async(id) => {
    await dispatch(deleteCoupon(id));
    await dispatch(getCoupons());
  }

  return (
    <div className="mt-4 couponList-wrapper">
      <h5>Coupon</h5>
      <div>
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "5vh" }}
          >
            <img
              style={{ width: "50px", marginBottom: "25px" }}
              src={LoadingGif}
              alt="loading.."
            />
          </div>
        ) : coupons.length === 0 ? (
          <p>No coupon found</p>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">s/n</th>
                  <th scope="col">Name</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Created Date</th>
                  <th scope="col">Expiry Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon, index) => {
                  const { _id, name, discount, createdAt, expiresAt } = coupon;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{discount}</td>
                      <td>{createdAt.substring(0, 10)}</td>
                      <td>{expiresAt.substring(0, 10)}</td>
                      <td>
                        <span>
                          <FaTrashAlt 
                            size={20} 
                            color={"red"} 
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
