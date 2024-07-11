import Coupon from "../models/coupon.js";

export const create = async (req, res) => {
  try {
    const { name, expiresAt, discount } = req.body;

    if (!name || !expiresAt || !discount) {
      return res.json("Please fill in all fields");
    }
    const coupon = await Coupon.create({
      name,
      expiresAt,
      discount,
    });
    res.json(coupon);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const list = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createAt: -1 });
    res.json(coupons);
  } catch (error) {
    console.log(error);
    return res.json(error.message);
  }
};

export const read = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({
            name: req.params.couponName,
            expiresAt: { $gt: Date.now() }
        })
        if (!coupon) {
            return res.status(404).json("Coupon not found or has expired");
        }

        res.json(coupon)
    } catch (error) {
        console.log(error);
        res.json(error.message);
    }
}

export const remove = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id);

        if(!coupon) {
            return res.status(404).json("Coupon not found");
        }

        res.json({ message: "Coupon deleted successfully"});
    } catch (error) {
        console.log(error);
        res.json(error.message)
        
    }
}
