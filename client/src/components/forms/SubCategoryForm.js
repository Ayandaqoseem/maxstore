import { Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const { Option } = Select;


export default function SubCategoryForm({
    value,
    setValue,
    buttonText="Create",
    handleSubmit,
    handleDelete
}) {
       // state
       const [categories, setCategories] = useState([]);
       
   
       useEffect(() => {
           loadCategories();
       }, []);
   
   
       const loadCategories = async () => { 
           try {
              const { data } = await axios.get("/categories");
              setCategories(data); 
           } catch (err) {
               console.log(err);
           }
       }



    return (
        <div className="p-3">
            <form onSubmit={handleSubmit}>
              <Select
                showSearch
                bordered={false}
                size="large"
                className="form-select mb-3"
                placeholder="choose category"
                onChange={(value) => value}
              >
                {categories.map((c) => <Option key={c._id} value={c.name}>
                    {c.name}
                </Option>)}
              </Select>

              <input
                className="form-control p-3"
                placeholder="create sub category"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />

              <div className="d-flex justify-content-beween">
                <button className="btn btn-info-create mt-3">{buttonText}</button>
                {handleDelete && (
                <button className="btn btn-danger mt-3" onClick={handleDelete}>Delete</button>
            )}
              </div>
            </form>
        </div>
    )
}