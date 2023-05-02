const express = require('express');
const router = express.Router();
const productModel = require('../../Infrastructure/Models/productModel');
const productController = require('../controllers/productController');
router.post('/', productController.addProduct);
router.post('/myproducts/:id', productController.getProductsUser);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.patch('/:id' ,productController.updateProduct);
router.delete('/:id', productController.deleteProduct);




router.get('/', function(req, res, next) {
  res.send('products list page !');
});

module.exports = router;
