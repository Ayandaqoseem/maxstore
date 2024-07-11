import { useDispatch, useSelector } from "react-redux";
import "./OrderHistory.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import LoadingGif from "../../../../image/loading/spinner.gif";
import AdminMenu from "../../../../components/Nav/AdminMenu";
import { getAllOrders } from "../../../../redux/features/order/orderSlice";

export default function OrderAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const openOrderDetails = (id) => {
    navigate(`/dashboard/admin/order-details/${id}`);
  };

  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orders.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="container-fluid d-wrapper-orderAdmin">
      <div className="row">
        <div className="col-md-2 --sidebar-wrapper-dashboard">
          <AdminMenu />
        </div>
        <div className="col-md-10 orderAdmin-wrapper">
          <section>
            <div className="container order">
              <h4>Your order History</h4>
            </div>
            <p>
              Open order to <b>update order status</b>
            </p>
            <br />
            <>
              {isLoading && (
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
              )}
              <div className="table ">
                {orders.length === 0 ? (
                  <p>No order found</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>s/n</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Order ID</th>
                        <th>Order Amount</th>
                        <th>Order Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((order, index) => {
                        const {
                          _id,
                          orderDate,
                          orderTime,
                          orderAmount,
                          orderStatus,
                        } = order;
                        return (
                          <tr key={_id} onClick={() => openOrderDetails(_id)}>
                            <td>{itemOffset + index + 1}</td>
                            <td>{orderDate}</td>
                            <td>{orderTime}</td>
                            <td>{_id}</td>
                            <td>NGN{orderAmount}</td>
                            <td>
                              <p
                                className={
                                  orderStatus !== "Delivered"
                                    ? "pending"
                                    : "delivered"
                                }
                              >
                                {orderStatus}
                              </p>
                            </td>
                            <td></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="Prev"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="activePage"
              />
            </>
          </section>
        </div>
      </div>
    </div>
  );
}
