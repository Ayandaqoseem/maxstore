import AdminMenu from "../../../../components/Nav/AdminMenu";
import BrandList from "./BrandList";
import CreateBrand from "./CreateBrand";
import "../product/styles/brand.scss";



export default function Brand () {
    


  
    return (
        <>
            <div className="container-fluid d-wrapper-brand">
                <div className="row">
                    <div className="col-md-2 extra-style-brand">
                        <AdminMenu />
                    </div>
                    <div className="col-md-10 mt-5 container extra-style-brand-col">
                        <CreateBrand  />
                        <BrandList />
                    </div>
                </div>
            </div>
        </>
    )
}
