import axios from "axios";


const API_URL = process.env.REACT_APP_API;

// create category
const createCategory = async (formData) => {
    const response = await axios.post(
        API_URL + "/category", formData, {
            withCredentials: true
        });
        return response.data
};

// Get Categories
const getCategories = async () => {
  const response = await axios.get(
    API_URL + "/categories", 
  );
  return response.data
};

//  delete Categories
const deleteCategory = async (slug) => {
  const response = await axios.delete(
    API_URL + "/category/" + slug, {
      withCredentials: true
    }
  );
  return response.data.message;
}

// create brand
const createBrand = async (formData) => {
  const response = await axios.post(
    API_URL + "/brand", 
    formData, {
      withCredentials: true
    }
  );
  return response.data
}

//  get brand
const getBrands = async () => {
  const responses = await axios.get(
    API_URL + "/brands"
  );
  return responses.data
}

// delete brand
const deleteBrand = async (id) => {
  const response = await axios.delete(
    API_URL + "/brand/" + id, {
      withCredentials: true
    }
  );
  return response.data.message
}




const categoryAndBrandService = {
    createCategory,
    getCategories,
    deleteCategory,
    createBrand,
    getBrands,
    deleteBrand,
};

export default categoryAndBrandService;