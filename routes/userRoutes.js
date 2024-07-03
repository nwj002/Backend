const router = require('express').Router();
const userController = require('../controllers/userController')

//creating user regestration form.
router.post('/create', userController.createUser);
//login routes
router.post('/login', userController.loginUser)

//forget password
router.post('/forget_password', userController.forgotPassword)

//verify otp and set new password
router.post('/verify_otp', userController.verifyOptandSetPassword)

//controller bata export bhayo tya bata routes ma gayo ani import bhayo and use bahyo index.js

//exporting the router
module.exports = router;