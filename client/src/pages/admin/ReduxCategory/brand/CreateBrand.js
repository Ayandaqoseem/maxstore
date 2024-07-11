import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../../components/cards/Card";
import { createBrand, getBrands, getCategories } from "../../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import { toast } from "react-hot-toast";




export default function CreateBrand() {
        const [name, setName] = useState(""); 
        const [category, setCategory] = useState("");
        const { isLoading, categories } = useSelector((state) => state.category);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(getCategories());
        }, [dispatch]);

        const saveBrand = async(e) => {
            e.preventDefault();
            if (name.length < 3) {
                return toast.error("Brand name must be up to 3 characters.");
            }
            if (!category) {
                return toast.error("Please add a category.");
            }
            const formData = {
                name,
                category,
            }
            await dispatch(createBrand(formData));
            await dispatch(getBrands());
            setName("");
            
        }
    return ( 
        <>
            <div>
                <h5>Create Brand</h5> 
                <p>
                    Use the form to <b>Create a Brand.</b> 
                </p>
                <Card cardClass={"card"}>
                    <form className="p-3" onSubmit={saveBrand}>
                        <label className="m-2">Brand Name</label>
                        <input
                            placeholder="Brand name"
                            name={name}
                            className="form-control p-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required        
                        />
                        <label className="m-2">Category</label>
                        <select
                            className="form-control p-3 selectActive"
                            name="category"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>Select Category</option> 
                            {categories.length > 0 &&
                                categories.map((cat) => (
                                    <option key={cat._id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))
                            }                   
                        </select>
                        <div>
                            <button
                                type="submit"
                                className="--btn --btn-primary mt-3 mb-3"
                            >Save Brand</button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    )
}