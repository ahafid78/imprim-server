const Product = require("../models/ProductModel");

async function getProducts(req, res) {
  let result = await Product.find();
  res.json(result);
}

async function getProductById(req, res) {
  let id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(500).json({
      success: false,
      error: "ID Must be a number",
    });
  } else {
    let allResults = await Product.find();
    let result = await Product.find({ id: id });
    if (id > allResults.length) {
      res.status(404).json({
        success: false,
        error: "Product not found",
      });
    } else {
      res.json({
        success: true,
        products: result,
      });
    }
  }
}

async function addProduct(req, res) {
  let product = req.body.product;

  let result = await Product.create(product);

  res.json({
    success: true,
    msg: "Vous avez bien ajouté votre produit",
    produitAjouté: result,
  });
}

async function editProduct(req, res) {
  let editedProduct = req.body.product;
  let result = await Product.findOneAndUpdate(
    { id: editedProduct.id },
    editedProduct
  );

  res.json({
    success: true,
    msg: "Vous avez bien modifié votre produit",
    produitAjouté: result,
  });
}

async function deleteProduct(req, res) {
  let productId = req.body.id;
  let result = await Product.findOneAndDelete({ id: productId });

  res.json({
    success: true,
    msg: "Vous avez bien supprimé votre produit",
    produitAjouté: result,
  });
}
const productController = {
  getProducts: getProducts,
  getProductById: getProductById,
  addProduct: addProduct,
  editProduct: editProduct,
  deleteProduct: deleteProduct,
};

module.exports = productController;
