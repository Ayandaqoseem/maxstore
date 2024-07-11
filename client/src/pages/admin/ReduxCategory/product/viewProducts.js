import { useEffect, useState } from "react";
import AdminMenu from "../../../../components/Nav/AdminMenu";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../../../redux/features/product/productSlice";
import Search from "../../../../components/search/Search";
import LoadingGif from "../../../../image/loading/spinner.gif";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import "../product/styles/viewProducts.css";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { confirmAlert } from "react-confirm-alert";

export default function ViewProducts() {
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);


  
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch]);


  const handleDeleteProduct = async(id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  }

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product?",
      buttons: [
        {
          label: "Delete",
          onClick: () => handleDeleteProduct(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };


  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length  / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  }; 

 
  console.log("show current products", currentItems);
  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 --sidebar-wrapper-dashboard-viewProduct">
              <AdminMenu />
            </div>
            <div className="col-md-10 mt-5 container --sidebar-wrapper-dashboard-viewProduct-col">
              <section>
                <div className="product-list">
                  <div className="table">
                    <div className="--flex-between --flex-dir-column">
                      <span>
                        <h5>All Products</h5>
                        <p className="productCount">
                          ~ <b>{products.length}</b> Products found
                        </p>
                      </span>
                      <span>
                        <Search 
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </span>
                    </div>
                  </div>

                  {isLoading && 
                       <div
                       className="d-flex justify-content-center align-items-center"
                       style={{ height: "10vh" }}
                     >
                       <img style={{ width: "100px" }} src={LoadingGif} alt="loading.." />
                     </div> 
                  }

                  {!isLoading && currentItems.length === 0 ? (
                    <p> -- No product found...</p>
                  ) : (
                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr>
                            <th>s/n</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Value</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        
                        <tbody>
                          {currentItems.map((product, index) => {
                            const { _id, name, category, price, quantity} = product
                            return(
                              <tr key={_id}>
                                <td>{itemOffset + index + 1}</td>
                                <td>{name?.substring(0, 16).concat("...")}</td>
                                <td>{category}</td>
                                <td>
                                  {"NGN"}
                                  {price}
                                </td>
                                <td>{quantity}</td>
                                <td>
                                  {"NGN"}
                                  {price * quantity}
                                </td>
                                <td className="icons">
                                  <span>
                                  <Link to="/">
                                      <AiOutlineEye size={25} color={"purple"} />
                                  </Link>
                                  </span>
                                  <span className="icon-span">
                                  <Link to={`/dashboard/admin/edit-product/${_id}`}>
                                    <FaEdit size={20} color={"green"} />
                                  </Link>
                                  </span>
                                  <span>
                                  <FaTrashAlt
                                    size={20}
                                    color={"red"}
                                    onClick={() => confirmDelete(_id)}
                                  />
                                  </span>
                                </td>

                              </tr>
                            )
                          })} 
                        </tbody>
                      </table>
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
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
