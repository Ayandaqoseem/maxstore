import slugify from "slugify";
import Product from "../models/product.js";
// import User from "../models/user.js"
// import fs from "fs";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;





// export const create = async (req, res) => {
//     try {
//         const { name, description, price, category, subCategory, shipping, quantity, color, brand } = req.fields;
//         const { photo } = req.files
//         switch (true) {
//             case !name.trim():
//                 return res.json({ error: "Name is required" });
//             case !description.trim():
//                 return res.json({ error: "Description is requred" });
//             case !price.trim():
//                 return res.json({ error: "Price is required" });
//             case !category.trim():
//                 return res.json({ error: "Category is required" });
//             case !subCategory.trim():
//                 return res.json({ error: "Subcategory is required" });
//             case !shipping.trim():
//                 return res.json({ error: "Shippng is required" });
//             case !quantity.trim():
//                 return res.json({ error: "Quantity is required" });
//             case !brand.trim():
//                 return res.json({ error: "Brand is required" });
//             case !color.trim():
//                 return res.json({ error: "Color is required" });
//             case photo && photo.size > 1000000:
//                 return res.json({ error: "Image should be less than 1mb in size" });
//         }

//         // const existingProduct =await Product.findOne({ name })
//         // if(existingProduct) {
//         //     return res.json({ error: "Already exist"});
//         // }

//         const product = new Product({ ...req.fields, slug: slugify(name) })

//         if(photo) {
//             product.photo.data = fs.readFileSync(photo.path);
//             product.contentType = photo.type;
//         }

//         await product.save();
//         res.json(product);
//     } catch (err) {
//         console.log(err);
//         return res.status(400).json(err.message);
//     }
// }

export const create = async (req, res) => {
    try {
        const { 
            name,
            price,
            sku,
            brand,
            category,
            description,
            photo,
            quantity,
            regularPrice,
            shipping,
            color,
        } = req.body
            console.log(req.body);
        // validation
        if (!name || !price || !category || !brand || !description || !quantity) {
            return res.json({ error: "Please fill in all fields" })
        }

        const product = await new Product({ 
            name,
            price,
            sku,
            brand,
            category,
            description,
            photo,
            quantity,
            regularPrice,
            shipping,
            color, 
            slug: slugify(name) 
        }).save()
        res.json(product);
    } catch (error) {
       console.log(error); 
    //    return res.status(400).json(err.message)
        if(error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err) => err.message);
            res.json({ message: errors })
        } else {
            res.status(400).json(error.message)
        }
    }
}



export const list = async (req, res) => {
    try {
        const products = await Product.find()
        // .populate("category")
        // .populate("subCategory")
        // .select("-photo")
        // .limit(6)
        .sort({ createdAt: -1 });

        res.json(products);
    } catch (err) {
       console.log(err); 
       return res.status(400).json(err.message);
    }
}



export const read = async (req, res) => {
    try {
        const product = await Product.findById( req.params.productId )
        
        if(!product) {
            res.json({ error: "Product not found" });
        }

        res.json(product);
    } catch (err) {
      console.log(err);  
      return res.status(400).json(err.message)
    }
}



// export const photo = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.productId)
//         .select("photo");

//         if(product.photo.data) {
//             res.set("content-Type", product.photo.contentType);
//             return res.send(product.photo.data);
//         }
//     } catch (err) {
//         console.log(err);
        
//     }
// }


export const remove = async (req, res) => {
    try {
       const product = await Product.findById(req.params.id) 
       if(!product) {
        res.status(404).json({message: "Product not found."})
       }
       await product.deleteOne();
       


       res.json({message: "Product deleted."}) 
    } catch (err) {
      console.log(err);  
    }
}



// export const update = async (req, res) => {
//     try {
//         const { name, description, quantity, category, subCategory, shipping, price, brand, color } = req.fields;
//         const { photo } = req.files;

//         switch(true) {
//             case !name.trim():
//                 return res.json({ error: "Name is required" });
//             case !description.trim():
//                 return res.json({ error: "Description is required" });
//             case !quantity.trim():
//                 return res.json({ error: "Quantity is required" });
//             case !category.trim():
//                 return res.json({ error: "Category is required" });
//             case !subCategory.trim():
//                 return res.json({ error: "SubCategory is required" });
//             case !shipping.trim():
//                 return res.json({ error: "Shipping is required" });
//             case !price.trim():
//                 return res.json({ error: "Price is required" });
//             case !brand.trim():
//                 return res.json({ error: "Brand is required" });
//             case !color.trim():
//                 return res.json({ error: "Color is required" });
//             case photo && photo.size > 1000000:
//                 return res.json({ error: "Image should be less than 1mb in size" });
//         }


//         const product = await Product.findByIdAndUpdate(req.params.productId, {
//             ...req.fields,
//             slug: slugify(name),
//         },
//         { new: true }
//         )

//         if(photo){
//             product.photo.data = fs.readFileSync(photo.path);
//             product.photo.contentType = photo.type;
//         }

//         await product.save();
//         res.json(product);
//     } catch (err) {
//       console.log(err); 
//       return res.status(400).json(err); 
//     }
// }

export const update = async (req, res) => {
    try {
        const { 
            name,
            price,
            brand,
            category,
            description,
            photo,
            quantity,
            regularPrice,
            shipping,
            color,
        } = req.body
        
        const existingProduct = await Product.findById(req.params.productId);

        if (!existingProduct) {
            return res.json({ error: "Product not found" })
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            { _id: req.params.productId }, { 
            name,
            price,
            brand,
            category,
            description,
            photo,
            quantity,
            regularPrice,
            shipping,
            color, 
            slug: slugify(name) 
        },
            { 
                new: true,
                runValidators: true, 
            }
        );
        
        res.json(updatedProduct);
    } catch (error) {
        console.log(err); 
        if(error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err) => err.message)
            res.json({ message: errors})
        } else {
            res.status(400).json(error.message)
        }
    }
}


//  review Product
export const productReview = async (req, res) => {
    try {
            const { star, review, reviewDate} = req.body;
            const { id } = req.params; 
        
            // validation
            if ( star < 1 || !review) {
                return res.status(400).json("Please add star and review");
            }
        const product = await Product.findById(id);
        
            // if product dosent exist
            if (!product) {
                return res.json("Product not found.")
            }

            // update rating
            product.ratings.push({
                star,
                review,
                reviewDate,
                name: req.user.name,
                userID: req.user._id,
            });
            product.save();

            res.json("Product review added.");
        } catch (error) {
            console.log(err);
            
    }
 
}

// delete review

export const deleteReview = async (req, res) => {
    try {
       const { userID } = req.body;
       
       const product = await Product.findById(req.params.id);

        // if product doesnt exist
        if(!product) {
            return res.json("Product not found");
        }

        const newRatings = product.ratings.filter((rating) =>{
            return rating.userID.toString() !== userID.toString();
        })

        console.log(newRatings);
        product.ratings = newRatings;
        await product.save();
        res.json({ message: "Product reveiw deleted!!!."})
    } catch (error) {
        console.log(err);
    }
}

export const updateReview = async (req, res) => {
    try {
       const { star, review, reviewDate, userID } = req.body;
       const { id } = req.params;
       
        // validation
        if(star < 1 || !review) {
            return res.json("Please add star and review")
        }

        const product = await Product.findById(id);
        // if product doesn't exist
        if(!product) {
            return res.json("Product not found")
        }

        // match user to review
        if(req.user._id.toString() !== userID) {
            return res.status(404).json("User not authorized")
        }

        // Update Product review
        const updatedReview = await Product.findOneAndUpdate(
            {
                _id: product._id,
                "ratings.userID": mongoose.Types.ObjectId(userID)
            },
            {
                $set: {
                    "ratings.$.star": star,
                    "ratings.$.review": review,
                    "ratings.$.reviewDate": reviewDate,
                },
            }
        );

        if(updatedReview) {
            return res.json({ message: "Product review updated." })
        } else {
            return res.json("Product review not updated.")
        }
    } catch (err) {
        console.log(err);
    }
};