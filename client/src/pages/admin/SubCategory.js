import axios from "axios";
import AdminMenu from "../../components/Nav/AdminMenu";
import { useEffect, useState } from "react";
import { Select, Pagination } from "antd";
import { toast } from "react-hot-toast";
import { Modal } from "antd";

const { Option } = Select;

export default function SubCategory() {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectVisible, setSelectVisible] = useState(true);
  const itemsPerPage = 10;


  

  const loadSubCategories = async () => {
    try {
      const categoryId = selectedCategory ? selectedCategory._id : "";
      const { data } = await axios.get(
        `/sub-categories?page=${currentPage}&perPage=${itemsPerPage}&categoryId=${categoryId}`
      );
      // console.log("Data => ", data);
      setSubCategories(data.subCategory);
      setTotalPages(data.totalPage);
      setTotalCount(data.totalCount);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadSubCategories();
    loadCategories();
  }, [currentPage, selectedCategory]);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        toast.error("Name is required");
        return;
      }
      if (!selectedCategory) {
        toast.error("Category is required");
        return;
      }
      const categoryId = selectedCategory._id;
      
      const { data } = await axios.post("/sub-category", {
        name: name.trim(),
        category: categoryId,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        loadSubCategories();
        setName("");
        setSelectVisible(true)
        toast.success(`${data.name} is created`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      toast.error("Create category failed. Try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!updatingName) {
        toast.error("Name is required");
        return;
      }

      if (!selectedCategory) {
        toast.error("Category is required");
        return;
      }

      if (!selectedSubCategory) {
        toast.error("Subcategory is required");
        return;
      }

      const categoryId = selectedCategory._id;
      const subCategoryId = selectedSubCategory._id;

      const updatedData = {
        name: updatingName.trim(),
        category: categoryId,
      };

      const { data } = await axios.put(`/sub-category/${subCategoryId}`, updatedData);
        console.log("Updated Data => ", data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        loadSubCategories();
        setUpdatingName("");
        setSelectedSubCategory(null);
        setSelectedCategory(null);
        toast.success(`${data.name} is updated`);
        setVisible(false);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      toast.error("Update category failed. Try again");
    }
  };

  const handleDelete = async (subCategory) => {
    try {
      // Perform the deletion on the server
      const { data } = await axios.delete(`/sub-category/${subCategory._id}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        // Update the state to remove the deleted subcategory
        setSubCategories((prevSubCategories) =>
          prevSubCategories.filter((s) => s._id !== subCategory._id)
        );
  
        // Reset the selected subcategory and category
        setSelectedSubCategory(null);
        setSelectedCategory(null);
        window.location.reload();
        toast.success(`${subCategory.name} is deleted`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Delete category failed. Try again");
    }
  };
  
  

  const handlePageChange = (page) => {
    setCurrentPage(page);

    // Calculate the total number of pages based on totalCount and itemsPerPage
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    // Adjust the currentPage if it exceeds the total number of pages
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <p className="p-3 mt-2 h6 custom-text fw-bold">Manage Sub category</p>

            <div className="p-3">
            
              <Select
                showSearch
                bordered={false}
                size="large"
                className="form-select mb-3"
                placeholder={selectedCategory ? undefined : "Choose category"}
                value={selectVisible ? selectedCategory?.id : undefined}
                onChange={(value) => {
                  const category = categories.find((c) => c._id === value);
                  setSelectedCategory(category);
                }}
                onBlur={() => {
                  if (!selectedCategory) {
                    setSelectedCategory(null);
                  }
                }}
              >
                {categories.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>

              <input
                className="form-control p-3"
                placeholder="Create sub category"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="d-flex justify-content-between">
                <button
                  onClick={handleSubmit}
                  className="btn btn-info-create mt-3"
                >
                  Create
                </button>
              </div>
            </div>

            <div>
              <div className="scroll-style table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">s/n</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {subCategories &&
                    subCategories.map((s, index) => (
                      <tr key={s.slug}>
                        <th scope="row" className="table-content">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </th>
                        <td className="table-content">{s.name}</td>
                        <td className="table-content">
                          {s.category ? s.category.name : ""}
                        </td>
                        <td className="table-content">
                          <button
                            onClick={() => {
                              // Open the modal and set the selected subcategory and category data
                              setSelectedSubCategory(s);
                              setUpdatingName(s.name);
                              const category = categories.find(
                                (c) => c._id === s.category?._id
                              );
                              setSelectedCategory(category || null);
                              setVisible(true);
                            }}
                            className="btn btn-info-create"
                          >
                            Update
                          </button>
                        </td>
  
                        <td>
                          <button
                            onClick={() => handleDelete(s)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              </div>
              <div>
                <Pagination
                  current={currentPage}
                  total={totalCount}
                  pageSize={itemsPerPage}
                  onChange={handlePageChange}
                  className="pagination mt-3 mb-3"
                />
              </div>
            </div>
            <Modal
              open={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <div className="p-3 mt-4">
                <Select
                  showSearch
                  bordered={false}
                  size="large"
                  className="form-select mb-3"
                  placeholder="Choose category"
                  value={selectedCategory ? selectedCategory._id : undefined}
                  onChange={(value) => {
                    const category = categories.find((c) => c._id === value);
                    setSelectedCategory(category);
                  }}
                >
                  {categories.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>

                <input
                  className="form-control p-3"
                  placeholder="Create sub category"
                  value={updatingName}
                  onChange={(e) => setUpdatingName(e.target.value)}
                />

                <div className="d-flex justify-content-between">
                  <button
                    onClick={handleUpdate}
                    className="btn btn-info-create mt-3"
                  >
                    Edit
                  </button>
                  {/* <button
                    onClick={() => handleDelete()}
                    className="btn btn-danger mt-3"
                  >
                    Delete
                  </button> */}
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>

    </div>
  );
}
