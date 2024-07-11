import slugify from "slugify";
import Brand from "../models/brand.js";
import Category from "../models/category.js"




export const create = async(req, res) => {
    try {
        const { name, category } = req.body;

        

        if(!name || !category) {
            return res.json({ error: "Please fill in all fields" });
        }
        const existingCategory =await Category.findOne({ name: category })
        // console.log(existingCategory);
        if(!existingCategory) {
            return res.json({ error: "Parent category not found. "});
        }
        const brand =await  Brand.create({ 
            name, 
            category, 
            slug: slugify(name), 
        });
        if(brand) {
            res.json(brand);
        }
    } catch (err) {
        console.log(err);
       return res.status(400).json(err)
    }
};


export const update = async (req, res) => {
    try {
        const {name, category} = req.body;
        const {brandId} = req.params
        const brand = await Brand.findByIdAndUpdate(brandId, {
            name, 
            slug: slugify(name),
            category 
        },
        { new: true }
        )
        res.json(brand);
    } catch (err) {
     console.log(err);
     return res.status(400).json(err.message);   
    }
};


export const remove = async (req, res) => {
    try {
        const removed = await Brand.findById(req.params.id);

        if(!removed) {
            return res.json({ error: "Brand not found" });
        }
        await removed.deleteOne();
        res.json({message: "Brand deleted."})
    } catch (err) {
      console.log(err);
      return res.status(400).json(err.message);  
    }
};


export const list = async (req, res) => {
    try {
        const all = await Brand.find().sort({ createdAt: -1 });
        res.json(all);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err.message);  
    }
};

export const read = async (req, res) => {
    try {
        const brand = await Brand.findOne({ slug: req.params.slug });
        res.json(brand);
    } catch (err) {
     console.log(err);
     return res.status(400).json(err.message);   
    }
}


