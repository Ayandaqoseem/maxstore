import { useSelector } from "react-redux";
import AdminMenu from "../../../components/Nav/AdminMenu";
import PageMenu from "../../../components/Nav/pageMenu/PageMenu";

export default function AdminWallet() {
   const { user } = useSelector((state) => state.auth)

    return (
        <div className="container-fluid d-wrapper">
           <div className="row">
            <div className="col-md-2 --sidebar-wrapper-dashboard">
                <AdminMenu />
            </div>

            <div className="col-md-10 mt-5 container">
                <PageMenu />
            <p className="p-3 mt-2 h6 custom-text fw-bold">Admin information</p>
                

            <ul className="list-group pb-3">
                <li className="list-group-item">{user?.newUser?.name}</li>
                <li className="list-group-item">{user?.newUser?.email}</li>
                <li className="list-group-item">admin</li>
            </ul>
            </div>
           </div>
        </div>
    )
}
