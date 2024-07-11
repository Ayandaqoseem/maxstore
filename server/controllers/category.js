import slugify from "slugify";
import Category from "../models/category.js";
import SubCategory from "../models/subCategory.js";

export const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({ error: "Already exist" });
    }
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const remove = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOneAndDelete({ slug: slug });
    if (!category) {
      res.status(404);
      return res.json("Category not found");
    }
    res.status(200).json({ message: "Category deleted." });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const all = await Category.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const read = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const getSubCategory = async (req, res) => {
  try {
    const subCategoryId = req.params.subCategoryId;
    //   console.log("getting sub-categoryId =>", subCategoryId);
    const subCategory = await SubCategory.find({
      category: subCategoryId,
    }).populate("category");

    console.log("subCategory found => ", subCategory);

    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found." });
    }

    res.json(subCategory);
  } catch (err) {
    return res.status(500).json({ message: "Server error." });
  }
};
