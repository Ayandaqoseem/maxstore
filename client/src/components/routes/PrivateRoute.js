import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "./Loadng";
import { useSelector, useDispatch } from "react-redux";
import { authUserCheck } from "../../redux/features/auth/authSlice";



export default function PrivateRoute() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    // state
    const [ok, setOk] = useState(false);
    const [ loading, setLoading] = useState(true);


    useEffect(() => {
    const authCheck = async () => {
        try {
            const response  = await dispatch(authUserCheck());
            const { message } = response.payload;
            if(message === "ok") {
                    setOk(true)
            } else {
                    setOk(false)
            }       
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('Unauthorized error occurred.');
              } else {
                console.log('An error occurred.');
              }
        } finally {
            setLoading(false)
        } 
    };

    authCheck();

    }, [dispatch]);

    if(loading) {
        return <Loading path="" />
    }

    if(!user) {
        return <Navigate to="/login" />
    }

    return ok ? <Outlet /> : <Loading />
}