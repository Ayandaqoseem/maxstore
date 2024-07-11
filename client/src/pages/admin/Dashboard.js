import AdminMenu from "../../components/Nav/AdminMenu";
import PageMenu from "../../components/Nav/pageMenu/PageMenu";

export default function AdminDashboard() {
  return (
    <div className="container-fluid d-wrapper">
      <div className="row">
        <div className="col-md-2 --sidebar-wrapper-dashboard">
          <AdminMenu />
        </div>

        <div className="col-md-10 mt-5 container">
          <PageMenu />
        </div>
      </div>
    </div>
  );
}
