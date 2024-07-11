import { useNavigate, useParams } from "react-router-dom"
import AdminMenu from "../../../../components/Nav/AdminMenu"
import { useEffect, useState } from "react"
import { RESET_PRODUT, getProduct, selectProduct, updateProduct } from "../../../../redux/features/product/productSlice"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import LoadingGif from "../../../../image/loading/spinner.gif";
import ProductForm from "./productForm"

export default function EditProduct() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productEdit = useSelector(selectProduct);
    const { isLoading, message } = useSelector((state) => state.product)


    const [product, setProduct] = useState(productEdit);
    const [description, setDescription] = useState("");
    
    const [files, setFiles] = useState([]);




    useEffect(() => {
        dispatch(getProduct(id))
    }, [dispatch, id]);

    useEffect(() => {
        setProduct(productEdit);

        setDescription(
            productEdit && productEdit.description ? productEdit.description : ""
        )

        if(productEdit && productEdit.photo) {
            setFiles(productEdit.photo)
        }
    }, [productEdit]);


    
  const saveProduct = async (e) => {
    e.preventDefault();
    if (files.length < 1) {
      return toast.error("Please add an image")
    };


    const formData = {
      name: product.name,
      category: product.category,
      brand: product.brand,
      color: product.color,
      quantity: Number(product.quantity),
      regularPrice: product.regularPrice,
      price: product.price,
      description,
      photo: files
    }
    // console.log(formData);
    await dispatch(updateProduct({ id, formData }));


    // navigate("/dashboard/admin/all-products");
    
  };

  useEffect(() => {
    if(message === "Product updated successfully") {
      navigate("/dashboard/admin/all-products");
    }
    dispatch(RESET_PRODUT)
  }, [message, navigate, dispatch]);



    return (
        <section>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                    {isLoading && 
                    <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "10vh" }}
                    >
                    <img style={{ width: "100px" }} src={LoadingGif} alt="loading.." />
                    </div> 
                }
                <h5 className="product-header-text">Update Product</h5>
                <ProductForm
                    saveProduct={saveProduct}
                    product={product}
                    setProduct={setProduct}
                    isEditing={true}
                    description={description}
                    setDescription={setDescription}
                    files={files}
                    setFiles={setFiles}
                />
                    </div>
                </div>
            </div>
        </section>
    )
}