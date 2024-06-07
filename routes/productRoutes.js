const router = require('express').Router();
const productController = require('../controllers/productController')
//creating user regestration form.
router.post('/create', productController.createProduct);
//fetch all products
router.get('/get_all_products', productController.getAllProducts);
//single product fetch
router.get('/get_single_product/:id', productController.getSingleProduct);

//delete_product
router.delete('/delete_product/:id', productController.deleteProduct);

//update product 
router.put('/update_product/:id', productController.updateProduct);


//exporting the router
module.exports = router;