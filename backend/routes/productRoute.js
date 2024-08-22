const express = require('express');
const router = express.Router();
const productController = require("../controlers/productControler.js")

router.route('/products')
.get(productController.getAllProducts);

router.route('/products/:productId')
.get(productController.getProductById)


module.exports = router