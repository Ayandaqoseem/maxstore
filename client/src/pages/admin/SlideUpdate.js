import { useEffect, useState } from "react";
import AdminMenu from "../../components/Nav/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "antd";
// import Resizer from "react-image-file-resizer"




export default function AdminSlideUpdate() {
  // state
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState("");
  // const [quantity, setQuantity] = useState("");
  // const [brand, setBrand] = useState("");
  // const [color, setColor] = useState("");
  const [id, setId] = useState("");
  const [visible, setVisible] = useState(false)

  console.log("name =>", name);


  // hook
  const navigate = useNavigate();
  const params =useParams();

  
  
  useEffect(() => {
    loadSlides()
  }, []);

  
  const loadSlides = async () => {
    try {
      const { data } = await axios.get(`/slide/${params.slug}`)
      setName(data.name);
      // setDescription(data.description);
      // setPrice(data.price);
      // setQuantity(data.quantity);
      // setBrand(data.brand);
      // setColor(data.color);
      setId(data._id)
    } catch (err) {
      console.log(err);
    }
  }
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      photo && productData.append("photo", photo);
      productData.append("name", name);
      // productData.append("description", description);
      // productData.append("price", price);
      // productData.append("quantity", quantity);
      // productData.append("brand", brand);
      // productData.append("color", color);
  
      
  
      const { data } = await axios.put(`/slide/${id}`, productData)

      console.log("show slide =>", data);
      if (data?.error) {
        toast.error(data.error)
      } else {
        toast.success(`${data.name} is updated`)
        navigate("/dashboard/admin/slides")
      }
    } catch (err) {
      console.log(err);
      toast.error("Slide update failed. Try again")
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/slide/${id}`)


      toast.success(`${data.name} is deleted.`)
      setVisible(false);
      navigate("/dashboard/admin/slides")
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again")
    }
  }
  
      

  return (
    <div className="container-fluid d-wrapper">
      <div className="row">
        <div className="col-md-2 --sidebar-wrapper-dashboard slide-extra-style">
          <AdminMenu />
        </div>
        <div className="col-md-10 mt-5 container">
          {/* <p className="p-3 mt-2 h6 custom-text fw-bold">Manage Product</p> */}

          {photo ? (
            <div className="img-wrapper">
              <img
                src={URL.createObjectURL(photo)}
                alt="product photo"
                className="img img-responsive"
                height="200px"
                width="100%"
              />
            </div>
          ): (
            <div className="text-center">
              <img
                src={`${process.env.REACT_APP_API}/slide/photo/${id}?${new Date().getTime()}`}
                alt="Banner slide photo" 
                className="img img-responsive"
                height="200px"
                width="100%"
              />
            </div>
          )}
          <div>
            <label className="btn btn-outline-secondary h4 col-12 mb-2 p-3 mt-2">
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
         <div className="d-flex justify-content-between">
         <button className="btn btn-info-create mb-4" onClick={handleSubmit}>
            Update
          </button>
          <button className="btn btn-danger mb-4" onClick={() => {
            setVisible(true)
          }}>
            Delete
          </button>

          <Modal
            open={visible}
            onOk={handleDelete}
            onCancel={() => {
              setVisible(false)
            }}
          >
            <p>Are you sure you want to delete</p>
          </Modal>
         </div>
        </div>
      </div>
    </div>
  );
}
