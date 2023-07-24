const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema ({
    
    firstName:{
        type:String,
       
    },
    lastName:{
        type:String,
        
    },
    email:{
        type:String, 
        required: true,           
    },
    phone:{
        type:String,        
    },
    
    password: {
        type: String,
        required: true,
      },
      token: {
        type: String,
      },

  },
  { timestamps: true }
);

const User = mongoose.model("User",UserSchema);
module.exports=User;