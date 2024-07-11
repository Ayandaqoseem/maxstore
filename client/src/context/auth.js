import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        newUser: null,
        token: "",
    });


    useEffect(() => {
        const data = localStorage.getItem("Auth");
        console.log("show data =>", data);
        if(data) {
            const parsed = JSON.parse(data);
            setAuth({ ...auth, newUser: parsed.newUser, token: parsed.token});
        }
    }, []);

    // axios config
    axios.defaults.baseURL = process.env.REACT_APP_API;
    axios.defaults.headers.common["Authorization"] = auth?.token;


    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
};


const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };