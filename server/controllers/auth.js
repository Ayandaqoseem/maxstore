import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  try {
    // distructure
    const { name, email, password } = req.body;

    // validate
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length < 8) {
      return res.json({ error: "Password must be at least 8 characters long" });
    }
    // check if email is taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "Email is already taken" });
    }
    // hash password
    const hashedPassword = await hashPassword(password);
    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();
    // create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400 * 7),
      // sameSite: "none",
      // secure: true,
    });
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length < 8) {
      return res.json({ error: "Password must be at least 8 characters long" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    // compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong password" });
    }
    // create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400 * 7),
      // sameSite: "none",
      // secure: true,
    });

    await User.findOne({ email }).select("-password");
    // console.log("show user details =>", user);
    res.json({ user, token });
  } catch (err) {
    console.log(err);
  }
};

// logout user
export const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            path: "/",
            httpOnly: true,
            expires: new Date(0),
            sameSite: "none",
            secure: true,
        })
        return res.json({ message: "Successfully Logged Out" });
    } catch (err) {
        console.log(err);
    }
}

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    console.log("show user data =>", user);

    if (!user) {
      return res.status(400).json("User not found");
    }
    return res.json(user);
  } catch (error) {
    console.log(err);
  }
};

// Get Login Status
export const getLoginStatus = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json(false);
  }
  // verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
};

export const update = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      const { name, phone, address } = user;
      user.name = req.body.name || name;
      user.phone = req.body.phone || phone;
      user.address = req.body.address || address;

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(err);
  }
};

export const updatePhoto = async (req, res) => {
  try {
    const { photo } = req.body;
    const user = await User.findById(req.user._id);
    user.photo = photo;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

export const authCheck = async (req, res) => {
  try {
    // console.log("show user", req.user._id);
    const user = await User.findById(req.user._id)
    if (user) {
      return res.json({ message: "ok"})
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

export const adminCheck = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (user) {
      return res.json({ message: "ok"})
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

export const saveCart = async (req, res) => {
  try {
    const { cartItems } = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
      user.cartItems = cartItems;
      user.save();
      res.json({ message: "Cart saved" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json("User not found");
  }
};

export const getCart = async (req, res) => {
  try {
    
    const user = await User.findById(req.user._id);
    if (user) {
    // console.log("User", user);
      res.json(user.cartItems);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json("User not found");
  }
};
