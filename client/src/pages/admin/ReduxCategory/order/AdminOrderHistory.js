import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./AdminOrderHistory.scss";
import { getOrder } from "../../../../redux/features/order/orderSlice";
import LoadingGif from "../../../../image/loading/spinner.gif";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import ChangeOrderStatus from "../../changeOrderStatus/ChangeOrderStatus";
import AdminMenu from "../../../../components/Nav/AdminMenu";


export default function AdminOrderHistory() {
  const { id } = useParams();
  const pdfRef = useRef();
  const dispatch = useDispatch();
  const { isLoading, order } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight);
      const imgX = (pdfWidth - imageWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imageWidth * ratio,
        imageHeight * ratio
      );
      pdf.save(`maxstore.pdf`);
    });
  };

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  return (
    
        <>
          <div className="container-fluid --adminOrderDetails">
            <div className="row">
              <div className="col-md-2 --orderDetails-sidebar-wrapper">
                <AdminMenu />
              </div>
              <div className="col-md-10">
                <div className="container order-details-container" ref={pdfRef}>
                  <h3>Order Details</h3>
                  <div>
                    <Link
                      to=
                       
                          "/dashboard/admin/order-history"
                      
                    
                    >
                      &larr; Back To Orders
                    </Link>
                    <br />
                    <div className="table">
                      {isLoading && order === null ? (
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ height: "10vh" }}
                        >
                          <img
                            style={{ width: "100px" }}
                            src={LoadingGif}
                            alt="loading.."
                          />
                        </div>
                      ) : (
                        <>
                          <p>
                            <b>Ship to:</b> {order?.shippingAddress?.name}
                          </p>
                          <p>
                            <b>Order ID:</b> {order?._id}
                          </p>
                          <p>
                            <b>Order Amount:</b> NGN{order?.orderAmount}
                          </p>
                          <p>
                            <b>Coupon:</b> {order?.coupon?.name} |{" "}
                            {order?.coupon?.discount}%
                          </p>
                          <p>
                            <b>Payment Method:</b> {order?.paymentMethod}
                          </p>
                          <p>
                            <b>Order Status:</b> {order?.orderStatus}
                          </p>
                          <p>
                            <b>Shipping Address</b>
                            <br />
                            Address: {order?.shippingAddress?.line1}
                            {order?.shippingAddress?.line2},
                            {order?.shippingAddress?.city}
                            <br />
                            State: {order?.shippingAddress?.state}
                            <br />
                            Country: {order?.shippingAddress?.country}
                          </p>
                          <div>
                            <ChangeOrderStatus />
                          </div>
                          <br />
                          {/* table */}
                          <table>
                            <thead>
                              <tr>
                                <th>s/n</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order?.cartItems?.map((cart, index) => {
                                const {
                                  _id,
                                  name,
                                  price,
                                  photo,
                                  cartQuantity,
                                } = cart;
                                return (
                                  <tr key={_id}>
                                    <td>{index + 1}</td>
                                    <td>
                                      <p>
                                        <b>{name}</b>
                                      </p>
                                      <img
                                        src={photo[0]}
                                        alt={name}
                                        style={{ width: "50px" }}
                                      />
                                    </td>
                                    <td>{price}</td>
                                    <td>{cartQuantity}</td>
                                    <td>{price * cartQuantity}</td>
                                    <td className={"icon"}>
                                      <button className="--btn --btn-primary">
                                        Review Product
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </>
                      )}
                    </div>
                    <div className="--center-all --my">
                      <button
                        className="--btn --btn-primary --btn-lg"
                        onClick={downloadPDF}
                      >
                        Download as PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    
  );
}
