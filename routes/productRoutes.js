const router = require('express').Router();
const productController = require('../controllers/productController')
//creating user regestration form.
router.post('/create', productController.createProduct);
//fetch all products
router.get('/get_all_products', productController.getAllProducts);
//exporting the router
module.exports = router;