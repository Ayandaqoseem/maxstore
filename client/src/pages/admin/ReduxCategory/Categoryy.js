import { useDispatch } from "react-redux";
import AdminMenu from "../../../components/Nav/AdminMenu";
import CategoryList from "./CategoryList";
import CreateCategory from "./CreateeCategory";
import { getCategories } from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import "./product/styles/category.scss"


export default function Category() {

  return (
    <>
      <section>
        <div className="container-fluid d-wrapper-category">
            <div className="row">
                <div className="col-md-2 --sidebar-wrapper-dashboard extra-style-category">
                    <AdminMenu />
                </div>
                <div className="col-md-10 mt-5 container">
                    <CreateCategory />
                    <CategoryList />
                </div>
            </div>
        </div>
      </section>
    </>
  );
}
