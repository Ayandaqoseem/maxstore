import { useEffect, useState } from "react";
import AdminMenu from "../../components/Nav/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";


export default function AdminProducts() {
    // state
    const [products, setProducts] = useState([]);


    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
           const { data } = await axios.get("/products");
           setProducts(data) 
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="container mt-5">
           <div className="row">
            <div className="col-md-3 ">
                <AdminMenu />
            </div>

            <div className="col-md-9">
            <p className="p-3 mt-2 h6 custom-text fw-bold">products</p>
                {products.map((p) => (
                    <Link key={p._id} 
                        to={`/dashboard/admin/product/update/${p.slug}`}
                        style={{ textDecoration: "none"}}
                    >
                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img 
                                        src={`${process.env.REACT_APP_API}/product/photo/${p._id}`} 
                                        alt={p.name}
                                        className="img img-fluid rounded-start"
                                        style={{ height: "200px", width: "200px"}}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                        <p className="card-text">
                                            <small className="text-muted">
                                                {moment(p.createdAt).format("MMMM DD YYYY, h:mm:ss a")}
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
           </div>
        </div>
    )
}