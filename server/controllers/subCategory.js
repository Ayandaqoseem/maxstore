import slugify from "slugify";
import SubCategory from "../models/subCategory.js";



export const create = async (req, res) => {
    try {
        const { name, category } = req.body;
        console.log(req.body);

        if(!name?.trim()) {
            return res.json({ error: "Name is required" });
        }
        if(!category?.trim()) {
            return res.json({ error: "Category is required" });
        }
        
        const existingSubCategory = await SubCategory.findOne({ name });
        if(existingSubCategory) {
            return res.json({ error: "Already exist" });
        }
     

        const subCategory = await new SubCategory({ 
            name, 
            category, 
            slug: slugify(name) 
        }).save();
        res.json(subCategory);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
}

export const update = async (req, res) => {
    try {
       const { name, category } = req.body;
       console.log("Req body => ", name, category);
       const { subCategoryId } = req.params; 
       const subCategory = await SubCategory.findByIdAndUpdate(subCategoryId, {
        name,
        slug: slugify(name),
        category
       },
       { new: true }
       )
       console.log("show subcategory details => ", subCategory);
       res.json(subCategory);
    } catch (err) {
       console.log(err); 
       return res.status(400).json(err);
    }
}

export const remove = async (req, res) => {
    try {
        const removed = await SubCategory.findByIdAndDelete(req.params.subCategoryId);
        res.json(removed);
    } catch (err){
        console.log(err);
        return res.status(400).json(err)
    }
}

export const list = async (req, res) => {
    try {
        const { page, perPage } = req.query;
        console.log(req.query);
        const currentPage = parseInt(page) || 1;
        const itemsPerPage = parseInt(perPage) || 10;

        const totalCount = await SubCategory.countDocuments();
        const totalPage = Math.ceil(totalCount / itemsPerPage);


       const subCategory = await SubCategory.find({})
       .populate("category")
       .skip((currentPage - 1) * itemsPerPage)
       .limit(itemsPerPage)
       .sort({ createdAt: -1 });
       res.json({
        subCategory,
        currentPage,
        totalPage,
        totalCount,
    }); 
    } catch (err) {
      console.log(err); 
      return res.status(400).json(err) 
    }

}


export const read = async (req, res) => {
    try {
      const subCategory = await SubCategory.findOne({ slug: req.params.slug });
      res.json(subCategory);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err)  
    }
}







