const userModel = require('../models/userModel');
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    //Step one : Check incoming data
    console.log(req.body);
    //Step two : Destrucutre the incoming data (i.e., firstname,lastname,age)
    const {firstName, lastName, email, password } = req.body;

    //Step three : Validate the data (Check if empty, stop the process and send response)
    if (!firstName || !lastName || !email || !password) {

        // res.send("Please fill up all the given fields!");
        //res.status(400).json()
        return res.json({                 //in json format
            "success": false,
            "message": "Please fill up all the given fields!"
        })

    }

    //Step four :  Error Handling (Try , Catch)
    try {
        //Step five : Check if the user is already registered or not
        const existingUser = await userModel.findOne({ email: email });

        //Step 5.1(If User found) : Send response

        if (existingUser) {
            return res.json({
                "status": false,
                "message": "User already exists!"
            })
        }
        // hashing/encryption of the password
        const randomSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,randomSalt)


        //Step 5.1.1 : Stop the process
        //Step 5.2(If user is not registered/ is new) :
        const newUser = new userModel({
            //database fields : client model
            firstName: firstName, // given by client
            lastName: lastName,
            email: email,
            password: hashedPassword,
        })

        //Step 5.2.2 : Save to Database.
        await newUser.save();


        //Send the response

        res.json({
            "success": true,
            "message": " User created successfully!"
        })
        //Step 5.2.1 : Hash the password

        //Step 5.2.3 : Send Succesful response to user.

    } catch (error) {
        console.log(error)
        res.json({
            "success": false,
            "message": "Internal Server Error!"
        })

    }




}

//Logic for Login

//Step one : Check incoming data
//Step two : Destrucutre the incoming data (i.e., firstname,lastname,age)
//Step three : Validate the data.
//Step four : Verify the credential
//Step 4.1 (If the credential match) : Send succesfull message to user
//Step 4.1.1 : Stop the process
//Step 4.2 (If credentials does not match ):
//Step 4.2.2 : Find the user
//Step


// login route
// change password

// exporting
module.exports = {
    createUser
}