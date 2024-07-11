import { useEffect, useState } from "react";
import AdminMenu from "../../components/Nav/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
// import Resizer from "react-image-file-resizer"



const { Option } = Select;

export default function AdminProductUpdate() {
  // state
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryOption, setSubCategoryOption] = useState([]);
  const [showSubCategory, setShowSubCategory] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [id, setId] = useState("");


  // hook
  const navigate = useNavigate();
  const params = useParams();


  console.log("show photo =>", photo);
  console.log("show name =>", name);
  console.log("show description =>", description);
  console.log("show price =>", price);
  console.log("show category =>", category);
  console.log("show subCategory =>", subCategory);
  console.log("show quantity =>", quantity);
  console.log("show shipping =>", shipping);
  console.log("show brand =>", brand);
  console.log("show color =>", color);
  console.log("show id =>", id);

 


  useEffect (() => {
    loadProduct();
  }, []);



  useEffect(() => {
    loadCategories();
  }, []);




  const loadProduct = async() => {
    try {
        const { data } = await axios.get(`/product/${params.slug}`);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setCategory(data.category._id);
        setSubCategory(data.subCategory._id);
        setShipping(data.shipping);
        setQuantity(data.quantity);
        setColor(data.color);
        setBrand(data.brand);
        setId(data._id)
        setShowSubCategory(data.subCategory.name)
        
        
    } catch (err) {
       console.log(err); 
    }
  }

  
  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };
  
  
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
      // setSubCategory([data[0]._id]);
      
      
    } catch (err) {
      console.log(err);
    }
  };

 
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      photo && productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category); 
      productData.append("subCategory", subCategory);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("color", color);
  
      
  
      const { data } = await axios.put(`/product/${id}`, productData)
      console.log("show product data =>", data);
      
      if (data?.error) {
        toast.error(data.error)
      } else {
        toast.success(`${data.name} is updated`)
        navigate("/dashboard/admin/products")
      }
    } catch (err) {
      console.log(err);
      toast.error("Product create failed. Try again")
    }
  };

  const handleDelete = async (req, res) => {
    try {
      let answer = window.confirm(
        "Are you sure yo want to delete this product."
      );
      if(!answer) return;
      const { data } = await axios.delete(`/product/${id}`)

      toast.success(`${data.name} is deleted`);
      navigate("/dashboard/admin/products")
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.")
    }

  }
  
      

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <p className="p-3 mt-2 h6 custom-text fw-bold">Update Product</p>


          
          {photo ? (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product photo"
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            ) : (
              <div className="text-center">
                <img
                  src={`${
                    process.env.REACT_APP_API
                  }/product/photo/${id}?${new Date().getTime()}`}
                  alt="product photo"
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            )}

            <div className="pt-2">
              <label className="btn btn-outline-secondary col-12 mb-3">
                {photo ? photo.name : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
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
              onChange={(e) => setDescription(e.target.value)}
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
              value={shipping === 0 ? "No" : "Yes"}
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

            
              <Select
                mode="multiple"
                bordered={false}
                size="large"
                placeholder="Choose subcategory"
                className="form-select mb-3"
                value={subCategory ? subCategory : undefined}
                onChange={(value) => {
                  setSubCategory(value[0]);
                  
                }}
              >
                {subCategoryOption.map((s) => (
                  <Option key={s._id} value={s._id}>
                    {s.name}
                  </Option>
                ))}
              </Select>
            <div className="d-flex justify-content-between">
              <button 
                className="btn btn-info-create mb-4" type="submit"
                onClick={handleSubmit}
              >
                Update
              </button>
              <button 
                className="btn btn-danger mb-4" type="submit"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          
        </div>
      </div>
    </div>
  );
}
