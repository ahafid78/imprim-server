const mongoose = require("mongoose")

const productSchema = new mongoose.Schema ({

  id: {
    type:Number,
      },
  title:{
    type:String,
    required: true,
      }, 
  price: {
    type:Number,
      },
  description: {
    type:String,
      },
  category: {
    type:String,
      },
  image: {
    type:String,
      }
    },

  { timestamps: true }
);

const Product = mongoose.model("Product",productSchema);
module.exports=Product;
