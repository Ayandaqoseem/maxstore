import axios from "axios";
import { useEffect, useState } from "react";
import AdminMenu from "../../components/Nav/AdminMenu";
import { Link } from "react-router-dom";
import "./slide.scss"


export default function AllSlides() {
    const [slide, setSlide] = useState([]);

    console.log("show all product slide =>", slide);


    useEffect(() => {
        loadSlides();
    }, []);

    const loadSlides = async () => {
        try {
          const { data } = await axios.get("/slides");
          setSlide(data) 
        } catch (err) {
          console.log(err);  
        }
    }

    return (
        <div className="container-fluid d-wrapper-slides">
            <div className="row">
                <div className="col-md-2 slide-extra-style-slides">
                    <AdminMenu />
                </div>
                <div className="col-md-10 mt-5 container slide-extra-style-slides-col">
                    <p className="p-3 mt-2 h6 custom-text fw-bold">slide</p>
                    {slide.map((s) => (
                        <Link key={s._id}
                            to={`/dashboard/admin/slide/update/${s.slug}`}
                            style={{ textDecoration: "none"}}
                        >
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col">
                                        <img
                                            src={`${process.env.REACT_APP_API}/slide/photo/${s._id}`}
                                            alt={s.name}
                                            className="img img-fluid rouded-start imgBanner"
                                            style={{ height: "280px", width: "100vw"}} 
                                        />
                                    </div>
                                    {/* <div className="col-md-2">
                                        <div className="card-body">
                                            <h5 className="card-title">{s.name}</h5>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}