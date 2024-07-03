const router = require('express').Router();
const productController = require('../controllers/productController');
const { authGuard, adminGuard } = require('../middleware/authGuard');

//creating user regestration form.
router.post('/create', productController.createProduct);

//fetch all products
router.get('/get_all_products', authGuard, productController.getAllProducts);

//single product fetch
router.get('/get_single_product/:id', authGuard, productController.getSingleProduct);

//delete_product
router.delete('/delete_product/:id', adminGuard, productController.deleteProduct);

//update product 
router.put('/update_product/:id', adminGuard, productController.updateProduct);

//paiganation
router.get('/pagination', productController.paginationProducts);


//exporting the router
module.exports = router;