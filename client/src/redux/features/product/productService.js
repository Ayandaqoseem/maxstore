import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_API;

export const API_URL = `${BACKEND_URL}/product`;

export const API_URLS = `${BACKEND_URL}/products`;


// create Product
const createProduct = async (formData) => {
    const response = await axios.post(
        API_URL, 
        formData, {
            withCredentials: true
        }
    );
    return response.data;
}

// get products
const getProducts = async () => {
    const response = await axios.get(API_URLS);

    return response.data;
}

// delete product
const deleteProduct = async (id) => {
    const response = await axios.delete(BACKEND_URL + "/product/" + id, {
        withCredentials: true
    });
    return response.data.message;
}

// get product
const getProduct = async (id) => {
    const response = await axios.get(BACKEND_URL + "/product/" + id, {
        withCredentials: true
    });
    return response.data;
};

// update product
const updateProduct = async (id, formData) => {
    const response = await axios.put(BACKEND_URL + "/product/" + id,
        formData,
     {
        withCredentials: true
    });
    return response;
}

const productService = {
    createProduct,
    getProducts,
    deleteProduct, 
    getProduct,
    updateProduct
}

export default productService;