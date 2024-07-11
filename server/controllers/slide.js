import slugify from "slugify";
import Slide from "../models/slide.js";
import fs from "fs";






export const create = async(req, res) => {
    try {

        const { name } = req.fields;
        const { photo } = req.files
        console.log("show photo =>", req.files);
        switch (true) {
            case !name.trim():
                return res.json({ error: "Name is required" });
            // case !description.trim():
            //     return res.json({ error: "Description is requred" });
            // case !price.trim():
            //     return res.json({ error: "Price is required" });
            // case !quantity.trim():
            //     return res.json({ error: "Quantity is required" });
            // case !brand.trim():
            //     return res.json({ error: "Brand is required" });
            // case !color.trim():
            //     return res.json({ error: "Color is required" });
            case photo && photo.size > 1000000:
                return res.json({ error: "Image should be less than 1mb in size" });
        }


        const slide = new Slide({ ...req.fields, slug: slugify(name) })

        if(photo) {
            slide.photo.data = fs.readFileSync(photo.path);
            slide.contentType = photo.type;
        }

        await slide.save();
        res.json(slide);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
}



export const photo = async (req, res) => {
    try {
        const slide = await Slide.findById(req.params.slideId)
        .select("photo");

        if(slide.photo.data) {
            res.set("content-Type", slide.photo.contentType);
            return res.send(slide.photo.data);
        }
    } catch (err) {
        console.log(err);
        
    }
}

export const list = async(req, res) => {
    try {
        const slide = await Slide.find({})
        .select("-photo")
        .sort({ createdAt: -1 })
        .limit(4);

        res.json(slide);
    } catch (err) {
       console.log(err); 
       return res.status(400).json(err.message)
    }
}


export const remove = async(req, res) => {
    try {
        const slide = await Slide.findByIdAndDelete(req.params.slideId)
        .select('-photo');


        res.json(slide);
    } catch (err) {
        console.log(err);
    }
}



export const update = async (req, res) => {
    try {
        const { name } = req.fields;
        const { photo } = req.files;

        switch(true) {
            case !name.trim():
                return res.json({ error: "Name is required" });
            // case !description.trim():
            //     return res.json({ error: "Description is required" });
            // case !quantity.trim():
            //     return res.json({ error: "Quantity is required" });
            // case !price.trim():
            //     return res.json({ error: "Price is required" });
            // case !brand.trim():
            //     return res.json({ error: "Brand is required" });
            // case !color.trim():
            //     return res.json({ error: "Color is required" });
            case photo && photo.size > 1000000:
                return res.json({ error: "Image should be less than 1mb in size" });
        }


        const slide = await Slide.findByIdAndUpdate(req.params.slideId, {
            ...req.fields,
            slug: slugify(name),
        },
        { new: true }
        )

        if(photo){
            slide.photo.data = fs.readFileSync(photo.path);
            slide.photo.contentType = photo.type;
        }

        await slide.save();
        res.json(slide);
    } catch (err) {
      console.log(err); 
      return res.status(400).json(err); 
    }
}


export const read = async (req, res) => {
    try {
        const slide = await Slide.findOne({ slug: req.params.slug })
        .select("-photo");

        res.json(slide);
    } catch (err) {
       console.log(err); 
       return res.status(400).json(err)
    }
}
