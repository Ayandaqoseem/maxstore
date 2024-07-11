import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import {
  deleteCategory,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import LoadingGif from "../../../image/loading/spinner.gif";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function CategoryList() {
  const { isLoading, categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const confirmDelete = (slug) => {
    confirmAlert({
      title: "Delete Category",
      message: "Are you sure you want to delete this category?",
      buttons: [
        {
          label: "Delete",
          onClick: () => handleDelete(slug),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const handleDelete = async (slug) => {
    await dispatch(deleteCategory(slug));
    await dispatch(getCategories());
  };
  return (
    <div className="mt-4">
      <h5>All Categories</h5>

      <div className="">
        {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "10vh" }}
        >
          <img style={{ width: "100px" }} src={LoadingGif} alt="loading.." />
        </div>
        ) : categories.length === 0 ? (
          <p>No Category found</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">s/n</th>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => {
                const { _id, name, slug } = cat;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>
                      <span>
                        <FaTrashAlt
                          size={20}
                          color="red"
                          onClick={() => confirmDelete(slug)}
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
