import { NavLink } from "react-router-dom"


export default function UserMenu() {
    return (
        <div className="sidebar-wrapper-dashboard">
            <p className="p-3 mt-2 h6 custom-text fw-bold">User dashboard</p>

            <ul className="list-group list-unstyled">
                <li>
                    <NavLink
                        className="nav-link text-warning-emphasis --sidebar-custom-style"
                        to="/dashboard/user/profile"
                    >
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="nav-link text-warning-emphasis --sidebar-custom-style"
                        to="/dashboard/user/order-history"
                    >
                        Orders
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}