const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const checkLogin = require("../middleware/auth");


module.exports = () => {

  router.get("/users", AuthController.getUsers);

  router.post("/auth/register", AuthController.register);

  router.post("/auth/login", AuthController.login);

  router.get("/verify-login", checkLogin, (req, res) => {

    res.status(200).send("Access to private route passed");
  });

  router.get("/users/:id",AuthController.getUserById);

  router.delete("/users/:id",AuthController.deleteUserById);

  router.put("/users/:id", AuthController.updateUserById);
  
  return router;
};
