import jwt from "jsonwebtoken";
import User from "../models/user.js";



export const requireSignin = async( req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ message: "Not authorized, please login"});
        };
        const decoded = jwt.verify(token,
            // req.headers.authorization,
            process.env.JWT_SECRET
            );
            
        const user = await User.findById(decoded._id).select("-password")

        if(!user) {
            return res.status(400).json({ message: "User not found"});
        }
        req.user = user;
        next()
    } catch (err) {   
       return res.status(401).json(err) 
    }
   
};

export const isAdmin = async (req, res, next) => {
    try {
       const user = await User.findById(req.user._id);
       if(user.role !== "admin") {
        return res.status(401).send("unauthorized");
       } else {
        next();
       }
    } catch (err) {
      console.log(err);  
    }
}

