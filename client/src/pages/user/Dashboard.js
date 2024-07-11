import UserMenu from "../../components/Nav/UserMenu";
import PageMenu from "../../components/Nav/pageMenu/PageMenu";

export default function Dashboard() {
    
    return (
        <div className="container-fluid d-wrapper">
           <div className="row">
            <div className="col-md-2 --sidebar-wrapper-dashboard">
                <UserMenu />
            </div>

            <div className="col-md-10 mt-5 container">
          <PageMenu />
        </div>
           </div>
        </div>
    )
}