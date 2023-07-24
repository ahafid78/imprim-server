const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// afficher tous les utilisateurs de la base
exports.getUsers=async(req,res)=> {
  try{
       const user = await User.find()
       res.status(200).json({
           msg:"Get with success",
           data:user
       })
  }catch(err){
   res.status(500).send(err.message)
  }
};

exports.register = async (req, res) => {
  try {
    let { email, passwords, firstName, lastName, phone } = req.body;

    // validation
    // console.log(firstName,lastName,phone)

    if (!(email && passwords)) {
      return res.status(400).send("All fields are required");
    }
    // check if this email belongs to another user registred in our db
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User already exists");
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(passwords, 10);
    // create new user
    const new_user = new User({
      firstName,
      lastName,
      phone,
      email,
      
      password: hashedPassword,
    });

    
    const saved_user = await new_user.save();

    const {password, ...userWithoutPassword} = saved_user._doc;


    return res.status(201).json({
      msg: "User created",
      data: userWithoutPassword
    },
   
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    let { email, passwords } = req.body;
    // validation
    if (!(email && passwords)) {
      return res.status(400).send("All fields are required");
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(passwords, user.password))) {
      // create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );
      // register token
      user.token = token;
      return res.status(200).json({
        msg: "User logged in",
        token: token,
      });
    } else {
      return res.status(404).send("Incrorect Email or password");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.getUserById=async(req,res) =>{
  try{
      const user = await User.findOne({ _id:req.params.id })
      res.status(200).json({
          msg:"Get with success",
          data:user
      })
  }catch(err){
  res.status(500).send(err.message)
  }
}

// Supprimer un utilisateur par id
exports.deleteUserById=async(req,res) =>{
  try{
      const user = await User.findOne({_id:req.params.id})
      if(!user) return res.status(404).send("User not found")
      await User.deleteOne({_id:req.params.id})
      res.status(200).json({
          msg:"Deleted successfully"
      })
  }catch(err){
   res.status(500).send(err.message)
  }  
};

//  Modifier ou creer un utilisateur si inexistant et afficher ce dernier 
exports.updateUserById=async (req,res)=> {
  try{
      const {firstName,lastName,email,phone} = req.body
      const user = await User.findOne({_id:req.params.id})
      if(!user) return res.status(404).send("User not found")
      const updated_user = await User.findOneAndUpdate({_id:req.params.id},{firstName,lastName,email,phone} ,{
          new:true,useFindAndModify:false
      })
      res.status(200).json({
          msg:"Updated Successfully",
          data:updated_user
      })
  }catch(err){
   res.status(500).send(err.message)
  }
};
