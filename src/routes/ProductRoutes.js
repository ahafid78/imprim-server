
const express = require("express");
const router = express.Router();

const productController = require("../controllers/ProductController");

module.exports = () => {

router.get("/products", productController.getProducts);
router.get("/product/:id", productController.getProductById);
router.post("/products", productController.addProduct);
router.put("/product/:id", productController.editProduct);
router.delete("/products", productController.deleteProduct);

   return router;
 };
