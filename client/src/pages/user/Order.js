import { useDispatch, useSelector } from "react-redux";
import PageMenu from "../../components/Nav/pageMenu/PageMenu";
import "./OrderHistory.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrders } from "../../redux/features/order/orderSlice";
import LoadingGif from "../../image/loading/spinner.gif";
import ReactPaginate from "react-paginate";


export default function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, orders } = useSelector((state) => state.order);




  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentOrders = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / itemsPerPage);


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orders.length;
    setItemOffset(newOffset)
  }

  const openOrderDetails = (id) => {
    navigate(`/dashboard/user/order-details/${id}`);
  };

  return (
    <div
      className={
        orders.length === 0
          ? "container-fluid userOrderWrapper"
          : "container userOrderContainerDetails"
      }
    >
      <div className="row">
        <div className="col-md-12">
          <section>
            <div className="userOrder-container">
              <PageMenu />
              <div className="container orderHistory">
                <h4>Your order History</h4>
              </div>
              <p>
                Open order to leave a <b>Product Review</b>
              </p>
            </div>
            <br />
            <>
              {isLoading ? (
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
                <div className="table">
                  {currentOrders.length === 0 ? (
                    <p className="orderText">No order found</p>
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
                        {currentOrders.map((order, index) => {
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
              )}
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
