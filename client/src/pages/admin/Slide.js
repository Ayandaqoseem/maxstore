import { useState } from "react";
import AdminMenu from "../../components/Nav/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./slide.scss"




export default function AdminSlide() {
  // state
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState("");
  // const [quantity, setQuantity] = useState("");
  // const [brand, setBrand] = useState("");
  // const [color, setColor] = useState("");


  // hook
  const navigate = useNavigate();
  

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("photo", photo);
      productData.append("name", name);
      // productData.append("description", description);
      // productData.append("price", price);
      // productData.append("quantity", quantity);
      // productData.append("brand", brand);
      // productData.append("color", color);
  
      
  
      const { data } = await axios.post("/slide", productData)

      console.log("show slide =>", data);
      if (data?.error) {
        toast.error(data.error)
      } else {
        toast.success(`${data.name} is created`)
        navigate("/dashboard/admin/slides")
      }
    } catch (err) {
      console.log(err);
      toast.error("Product create failed. Try again")
    }
  };
  
      

  return (
    <div className="container-fluid d-wrapper-slide">
      <div className="row">
        <div className="col-md-2 --sidebar-wrapper-dashboard slide-extra-style-slide">
          <AdminMenu />
        </div>
        <div className="col-md-10 mt-5 container">
          {/* <p className="p-3 mt-2 h6 custom-text fw-bold">Manage Product</p> */}

          {photo && (
            <div className="img-wrapper">
              <img
                src={URL.createObjectURL(photo)}
                alt="product photo"
                className=""
                width="100%"
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

          {/* <textarea
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
          /> */}
          <button className="btn btn-info-create mb-3" onClick={handleSubmit}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
