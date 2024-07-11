import CouponList from "./CouponList";
import CreateCoupon from "./CreateCoupon";
import "./Coupon.scss";
import AdminMenu from "../../../../components/Nav/AdminMenu";

export default function Coupon() {
  return (
    <section>
      <div className="container-fluid d-wrapper-coupon">
        <div className="row">
          <div className="col-md-2 --sidebar-wrapper-dashboard-coupon">
            <AdminMenu />
          </div>
          <div className="col-md-10 mt-5 mb-5 container --sidebar-wrapper-dashboard-coupon-col">
            <CreateCoupon />
            <CouponList />
          </div>
        </div>
      </div>
    </section>
  );
}
