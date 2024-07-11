import { useState } from "react";
import Card from "../../../components/cards/Card";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createCategory, getCategories } from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";


export default function CreateCategory() {
  const [name, setName] = useState("");

  const { isLoading, categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const saveCat = async (e) => {
    e.preventDefault();
    if (name.length < 3) {
      return toast.error("Coupon must be up to 3 charaters");
    }

    const formData = {
      name,
    };
    await dispatch(createCategory(formData));
    await dispatch(getCategories());
    setName("");
    
    
  };
  return (
    <>
     
      <div>
        <h5>Create Category</h5>
        <p>
          Use the form to <b>Create a Category.</b>
        </p>
        <Card cardClass={"card"}>
          <form className="p-3" onSubmit={saveCat}>
            <label className="m-2">Category Name:</label>
            <input
              type="text"
              placeholder="Category name"
              name="name"
              className="form-control p-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div>
              <button type="submit" className="--btn --btn-primary mt-3 mb-3">
                Save Category
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
