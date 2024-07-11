import Card from "../../../../components/cards/Card";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import UploadWidget from "./UploadWidget";
import { BsTrash } from "react-icons/bs";
import "./styles/productForm.css"
import { useDispatch, useSelector } from "react-redux";
import { getBrands, getCategories } from "../../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import { useEffect, useState } from "react";

export default function ProductForm({
  saveProduct,
  isEditing,
  product,
  setProduct,
  description,
  setDescription,
  files,
  setFiles,
}) {
  const dispatch = useDispatch();
  const [filteredBrands, setFilteredBrands] = useState([]);

  const { categories, brands } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  const filterBrand = (selectedCategory) => {
    const newBrand = brands.filter((brand) => brand.category === selectedCategory);
    setFilteredBrands(newBrand)
  };

  useEffect(() => {
    filterBrand(product?.category)
  }, [product?.category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

const removeImage = (image) => {
  setFiles(files.filter((img) => img !== image));
}


  return (
    <div className="add_product">
      <UploadWidget 
        files={files}
        setFiles={setFiles}
      />

      <Card cardClass={"card"}>
        <br />
        <form className="p-3" onSubmit={saveProduct}>
        <label className="mt-3">Product Image</label>
        <div className="slide-cotainter">
          <aside>
            {files.length > 0 && 
              files.map((image) => (
                <div key={image} className="thumbnail">
                  <img 
                    src={image} 
                    alt="productImage"
                    height={100} 
                    />
                    <div>
                      <BsTrash 
                        size={25} 
                        className="thumbnailIcon"
                        onClick={() => removeImage(image)}
                      />
                    </div>
                </div>
              ))}
               {files.length < 1 && (
                <p className="p-text">No image set for this product.</p>
              )}
          </aside>
        </div>



          <label className="mt-3">Product Name</label>
          <input
            className="form-control p-3"
            type="text"
            placeholder="product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
            
          />

          <label className="mt-3">Category</label>
          <select
            className="form-control p-3"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          
          >
            {isEditing ? (
              <option value={product?.category}>{product?.category}</option>
            ) : (
              <option>select category</option>
            )}
            {categories.length > 0 &&
              categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
          </select>

          <label className="mt-3">Brand</label>
          <select
            className="form-control p-3"
            name="brand"
            value={product?.brand}
            onChange={handleInputChange}
            
          >
            {isEditing ? (
              <option value={product?.brand}>{product?.brand}</option>
            ) : (
              <option>select brand</option>
            )}
            {filteredBrands.length > 0 &&
              filteredBrands.map((brand) => (
                <option key={brand._id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
          </select>

          <label className="mt-3">Color</label>
          <input
            type="text"
            className="form-control p-3"
            placeholder="color"
            name="color"
            value={product?.color}
            onChange={handleInputChange}
          
          />

          <label className="mt-3">Regular Price</label>
          <input
            type="number"
            className="form-control p-3"
            placeholder="regular price"
            name="regularPrice"
            value={product?.regularPrice}
            onChange={handleInputChange}
            
          />

          <label className="mt-3">Discount</label>
          <input
            type="number"
            className="form-control p-3"
            placeholder="discount"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />

          <label className="mt-3">Quantity</label>
          <input
            type="number"
            className="form-control p-3"
            placeholder="quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
            
          />

          <label className="mt-3">Description</label>
          <ReactQuill 
            theme="snow" 
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats} 
            
          />

          <div>
            <button type="submit" className="--btn --btn-primary mt-3 mb-3">
              Save Product
            </button>
          </div>
        </form>
      </Card>
      <br />
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];
