import { useEffect, useState } from "react";
import AdminMenu from "../../components/Nav/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import CategoryForm from "../../components/forms/CategoryForm";
import { Modal } from "antd";

export default function AdminCategory() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatingName, setUpdatingName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/category", { name });
      if (data?.error) {
        toast.error(data.error);
      } else {
        loadCategories();
        setName("");
        toast.success(`${data.name} is created`);
      }
    } catch (err) {
      console.log(err);
      toast.error("create category failed. try again");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/category/${selected._id}`, {
        name: updatingName,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is updated`);
        setSelected(null);
        setUpdatingName("");
        loadCategories();
        setVisible(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Category may already exist. Try again");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`/category/${selected._id}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is deleted`);
        setSelected(null);
        loadCategories();
        setVisible(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 category-container-wrapper">
          <p className="p-3 mt-2 h6 custom-text fw-bold">Manage Category</p>

          <CategoryForm
            value={name}
            setValue={setName}
            handleSubmit={handleSubmit}
          />

          <hr />

          <div className="col">
            <p className="text-body-secondary text-sm">
              Click the category button to update or delete
            </p>
            {categories.map((c) => (
              <button
                key={c._id}
                className="btn btn-info m-3 "
                onClick={() => {
                  setVisible(true);
                  setSelected(c);
                  setUpdatingName(c.name);
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
          <Modal
            open={visible}
            onOk={() => {
              setVisible(false);
            }}
            onCancel={() => {
              setVisible(false);
            }}
            footer={null}
          >
            <CategoryForm
              value={updatingName}
              setValue={setUpdatingName}
              handleSubmit={handleUpdate}
              handleDelete={handleDelete}
              buttonText="Update"
            />
          </Modal>
        </div>
      </div>
    </div>
  );
}
