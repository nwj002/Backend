const router = require('express').Router();
const userController = require('../controllers/userController')

//creating user regestration form.
router.post('/create', userController.createUser);
//login routes
router.post('/login', userController.loginUser)

//controller bata export bhayo tya bata routes ma gayo ani import bhayo and use bahyo index.js

//exporting the router
module.exports = router;