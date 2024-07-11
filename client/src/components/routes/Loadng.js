import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingGif from "../../image/loading/spinner.gif"

export default function Loading({ path = "login" }) {
    // state
    const [count, setCount] = useState(3);
    // hook
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        count === 0 && navigate(`/${path}`, {
            state: location.pathname,
        });

        return () => clearInterval(interval);
    }, [count]);

    return (
        <>
            <div className="d-flex justify-content-center align-items-center"
                style={{ height: "90vh"}}
            >
                <img style={{ width: "100px"}} src={LoadingGif} alt="loading.." />
            </div>
        </>
    )
}