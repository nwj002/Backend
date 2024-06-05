const path = require('path');
const productModel = require('../models/productModel');
const { get } = require('http');

const createProduct = async (req, res) => {
    console.log(req.body);
    console.log(req.files);

    //destructuring the body data (json data)
    const { productName, productPrice, productDescription, productCategory } = req.body;

    //validation the data
    if (!productName || !productPrice || !productDescription || !productCategory) {
        return res.status(400).json({
            "success": false,
            "message": "Please fill all the fields"
        });
    }
    //validate if there is image
    if (!req.files || !req.files.productImage) {
        return res.status(400).json({
            "success": false,
            "message": "Please upload an image"
        });
    }
    const { productImage } = req.files;
    //upload image
    //1. generate new image name( abc.png cha bhani  chnage hunu paryo 123-abc.png)
    const imageName = `${Date.now()}-${productImage.name}`;
    //2. make a upload path(/path/upload - directory huncha)
    const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`);
    //3. move to that directory(await, try catch)
    try {
        await productImage.mv(imageUploadPath)
        //save to data base
        const newProduct = new productModel({
            productName: productName,
            productPrice: productPrice,
            productDescription: productDescription,
            productCategory: productCategory,
            productImage: imageName
        });
        const product = await newProduct.save();
        res.status(201).json({
            "success": true,
            "message": "Product created successfully",
            "product": product
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "success": false,
            "message": "Image upload failed",
            "error": error
        });
    }
};

//Fetch all products
const getAllProducts = async (req, res) => {
    //try catch
    try {
        const allProducts = await productModel.find({})
        res.status(201).json({
            "success": true,
            "message": "All products fetched successfully",
            "data": allProducts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        })
    }
    //Fetch all products
    //Send response
}

//fetch single product
const getSingleProduct = async (req, res) => {
    //get product id from url (yellai bhancha params)
    const productId = req.params.id;
    //try catch
    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(400).json({
                "success": false,
                "message": "Product not found"
            })
        }
        res.status(201).json({
            "success": true,
            "message": "Product fetched successfully",
            "data": product
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        })
    }


}
// delete product
const deleteProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        res.status(201).json({
            "success": true,
            "message": "Product deleted successfully!!!",
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error

        })

    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct,

}