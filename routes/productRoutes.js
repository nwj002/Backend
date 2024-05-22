const router = require('express').Router();
const productController = require('../controllers/productController')
//creating user regestration form.
router.post('/create', productController.createProduct);
//exporting the router
module.exports = router;