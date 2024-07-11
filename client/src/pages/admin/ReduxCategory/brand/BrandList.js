import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import LoadingGif from "../../../../image/loading/spinner.gif";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteBrand,
  getBrands,
} from "../../../../redux/features/categoryAndBrand/categoryAndBrandSlice";

export default function BrandList() {
  const { isLoading, brands } = useSelector((state) => state.category);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);


  
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Brand",
      message: "Are you sure you want to delete this brand?",
      buttons: [
        {
          label: "Delete",
          onClick: () => handleDeleteBrand(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };
  
  const handleDeleteBrand = async (id) => {
    
      await dispatch(deleteBrand(id));
      await dispatch(getBrands());
  
  };

  return (
    <div className="mt-4">
      <h5>All Brands</h5>

      <div className="">
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "10vh" }}
          >
            <img style={{ width: "100px" }} src={LoadingGif} alt="loading.." />
          </div>
        ) : brands.length === 0 ? (
          <p>No Brand found</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">s/n</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand, index) => {
                const { _id, name, category } = brand;
                // console.log(name, slug, category);
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>
                      <span>
                        <FaTrashAlt
                          size={20}
                          color="red"
                          onClick={() => confirmDelete(_id)}
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
