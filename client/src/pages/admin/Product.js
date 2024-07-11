import { useEffect, useState } from "react";
import AdminMenu from "../../components/Nav/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import Resizer from "react-image-file-resizer"


const { Option } = Select;

export default function AdminProduct() {
  // state
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDiscription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryOption, setSubCategoryOption] = useState([]);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");


  // hook
  const navigate = useNavigate();

 

  
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
  };
  
  console.log("category =>", category);
  const handleCategoryChange = async (subCategoryId) => {
    try {
      // console.log("Handling category change:", subCategoryId);
      const { data } = await axios.get(`/category/subCategory/${subCategoryId}`);
      setSubCategoryOption(data);
      
      
      // Find the selected category by its ID
      const selectedCategory = categories.find((c) => c._id === subCategoryId);
      
      // Update the state with the name of the selected category
      setCategory(selectedCategory._id);
      
  
      // Reset the selected subcategories when changing the category
      setSubCategory([]);
      setShowSubCategory(true);
      
    } catch (err) {
      console.log(err);
    }
  };

  // const fileUploadAndResize = (e) => {
  //   let files = e.target.files;
  //   if(files) {
  //     for (let i = 0; i < files.length; i++) {
  //       Resizer.imageFileResizer(files[i],
  //         720,
  //         720,
  //         'JPEG',
  //         100,
  //         0,
  //         (uri) => {
  //           console.log("Show photo in binary", uri);
  //         }, "base64")
  //     }
  //   }
  // }
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category); 
      productData.append("subCategory", subCategory);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("color", color);
  
      
  
      const { data } = await axios.post("/product", productData)
      if (data?.error) {
        toast.error(data.error)
      } else {
        toast.success(`${data.name} is created`)
        navigate("/dashboard/admin/products")
      }
    } catch (err) {
      console.log(err);
      toast.error("Product create failed. Try again")
    }
  };
  
      

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <p className="p-3 mt-2 h6 custom-text fw-bold">Manage Product</p>

          {photo && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(photo)}
                alt="product photo"
                className="img img-responsive"
                height="200px"
              />
            </div>
          )}
          <div>
            <label className="btn btn-outline-secondary h4 col-12 mb-2 p-3">
              {photo ? photo.name : "Upload photo"}
              <input
                type="file"
                multiple
                name="photo"
                accept="image/*"
                onChange={(e)=> setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>

          <input
            type="text"
            className="form-control p-3 mb-2"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            type="text"
            className="form-control p-3 mb-2"
            placeholder="Write a description"
            value={description}
            onChange={(e) => setDiscription(e.target.value)}
          />

          <input
            type="number"
            className="form-control p-3 mb-2"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            min="1"
            className="form-control p-3 mb-2"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <input
            type="text"
            className="form-control p-3 mb-2"
            placeholder="Enter brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />

          <input
            type="text"
            className="form-control p-3 mb-2"
            placeholder="Enter color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />

          <Select
            bordered={false}
            size="large"
            placeholder="Choose shipping"
            className="form-select mb-2"
            onChange={(value) => setShipping(value)}
          >
            <Option value="0">No</Option>
            <Option value="1">Yes</Option>
          </Select>

          <Select
            showSearch
            bordered={false}
            size="large"
            placeholder={category ? category._id : "Choose categories"}
            className="form-select mb-3"
            value={category ? category : undefined}
            onChange={handleCategoryChange}
          >
            {categories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>

          {showSubCategory && (
            <Select
              mode="multiple"
              bordered={false}
              size="large"
              placeholder="Choose subcategory"
              className="form-select mb-3"
              // value={subCategory}
              onChange={(value) => setSubCategory(value[0])}
            >
              {subCategoryOption.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
            </Select>
          )}
          <button className="btn btn-info-create" onClick={handleSubmit}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
