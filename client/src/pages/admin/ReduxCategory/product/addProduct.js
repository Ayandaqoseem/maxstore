import AdminMenu from "../../../../components/Nav/AdminMenu";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "./productForm";
import { useEffect, useState } from "react";
import { RESET_PRODUT, createProduct } from "../../../../redux/features/product/productSlice";
import LoadingGif from "../../../../image/loading/spinner.gif";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../product/styles/addProduct.scss";

const initialState = {
  name: "",
  category: "",
  brand: "",
  quantity: "",
  price: "",
  color: "",
  regularPrice: "",
};

export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(initialState);
 
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  const { isLoading, message } = useSelector((state) => state.product);
 

  const { name, category, brand, price, quantity, color, regularPrice } =
    product;


  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku
  }

  const saveProduct = async (e) => {
    e.preventDefault();
    if (files.length < 1) {
      return toast.error("Please add an image")
    };


    const formData = {
      name,
      sku: generateSKU(category),
      category,
      brand,
      color,
      quantity: Number(quantity),
      regularPrice,
      price,
      description,
      photo: files
    }
    // console.log(formData);
    await dispatch(createProduct(formData));


    // navigate("/dashboard/admin/all-products");
    
  };

  useEffect(() => {
    if(message === "Product created successfully") {
      navigate("/dashboard/admin/all-products");
    }
    dispatch(RESET_PRODUT)
  }, [message, navigate, dispatch]);

  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 --sidebar-wrapper-dashboard-addProduct">
              <AdminMenu />
            </div>
            <div className="col-md-10 mt-5 container">
              {isLoading && 
                  <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "10vh" }}
                >
                  <img style={{ width: "100px" }} src={LoadingGif} alt="loading.." />
                </div> 
              }
              <h5 className="product-header-text">Add New Product</h5>
              <ProductForm
                saveProduct={saveProduct}
                product={product}
                setProduct={setProduct}
                isEditing={false}
                description={description}
                setDescription={setDescription}
                files={files}
                setFiles={setFiles}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
