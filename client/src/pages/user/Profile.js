import UserMenu from "../../components/Nav/UserMenu";


export default function Profile() {
    return (
        <div className="container-fluid d-wrapper">
            <div className="row">
               <div className="col-md-2 --sidebar-wrapper-dashboard">
                    <UserMenu />
                </div>
                <div className="col-md-10">
                <p className="p-3 mt-2 h6 custom-text fw-bold">Profile</p>
                </div> 
            </div>
        </div>
    )
}