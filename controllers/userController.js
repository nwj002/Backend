const userModel = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const sendOtp = require('../service/sendOtp')

const createUser = async (req, res) => {
    //Step one : Check incoming data
    console.log(req.body);
    //Step two : Destrucutre the incoming data (i.e., firstname,lastname,age)
    const { firstName, lastName, email, password, phone } = req.body;

    //Step three : Validate the data (Check if empty, stop the process and send response)
    if (!firstName || !lastName || !email || !password || !phone) {

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
                "success": false,
                "message": "User already exists!"
            })
        }
        // hashing/encryption of the password
        const randomSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, randomSalt)


        //Step 5.1.1 : Stop the process
        //Step 5.2(If user is not registered/ is new) :
        const newUser = new userModel({
            //database fields : client model
            firstName: firstName, // given by client
            lastName: lastName,
            email: email,
            password: hashedPassword,
            phone: phone
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
const loginUser = async (req, res) => {
    //check incoming data
    console.log(req.body)
    // destructuring
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
        return res.json({
            "success": false,
            "message": "please enter all the fields.gg"
        })
    }

    //try catch
    try {
        // find user by email
        const user = await userModel.findOne({ email: email })
        // found data : first name, lastname, email, password

        // not fount the email( error message saying user doesnt exist)
        if (!user) {
            return res.json({
                "success": false,
                "message": "User does not exist."
            })
        }

        // compare the password.( using bycript)
        const isValidPassword = await bcrypt.compare(password, user.password)

        // not compare error saying password is incorrect.
        if (!isValidPassword) {
            return res.json({
                "success": false,
                "message": "Invalid password"
            })
        }
        //token ( generate - userdata + KEY)
        const token = await jwt.sign(
            { id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET
        )

        // sending the response ( token, user data,)
        res.json({
            "success": true,
            "message": "user logined successfull",
            "token": token,
            "userData": user
        })

    } catch (error) {
        console.log(error)
        return res.json({
            "success": false,
            "message": "Internal server error."
        })
    }

}
// Forgot Password
const forgotPassword = async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({
            'success': false,
            'message': 'Provide your phone number!'
        })
    }

    try {

        // finding user
        const user = await userModel.findOne({ phone: phone })
        if (!user) {
            return res.status(400).json({
                'success': false,
                'message': 'User Not Found!'
            })
        }

        // generate random 6 digit otp
        const otp = Math.floor(100000 + Math.random() * 900000)

        // generate expiry date
        const expiryDate = Date.now() + 360000;

        // save to database for verification
        user.resetPasswordOTP = otp;
        user.resetPasswordExpires = expiryDate;
        await user.save();

        // send to registered phone number
        const isSend = await sendOtp(phone, otp)
        if (!isSend) {
            return res.status(400).json({
                'success': false,
                'message': 'Error Sending OTP Code!'
            })
        }

        // if success
        res.status(200).json({
            'success': true,
            'message': 'OTP Send Successfully!'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            'success': false,
            'message': 'Server Error!'
        })
    }
}

//verify opt  and set new password
const verifyOptandSetPassword = async (req, res) => {
    //get date 
    const { phone, otp, newPassword } = req.body;
    if (!phone || !otp || !newPassword) {
        return res.status(400).json({
            'success': false,
            'message': 'Please provide all t1he fields!'
        })
    }
    try {
        //find user
        const user = await userModel.findOne({ phone: phone })
        //check otp
        if (user.resetPasswordOTP != otp) {
            return res.status(400).json({
                'success': false,
                'message': 'Invalid OTP!'
            })
        }
        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                'success': false,
                'message': 'OTP Expired!'
            })
        }
        // hashing/encryption of the password
        const randomSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, randomSalt)

        //set new password
        user.password = hashedPassword;
        await user.save();

        //response
        res.status(200).json({
            'success': true,
            'message': 'Password Reset Successfully!'
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            'success': false,
            'message': 'Server Error!'
        })

    }
}




// login route
// change password

// exporting
module.exports = {
    createUser,
    loginUser,
    forgotPassword,
    verifyOptandSetPassword
}
//Step one : Check incoming data
//Step two : Destrucutre the incoming data (i.e., firstname,lastname,age)
//Step three : Validate the data.
//Step four : Verify the credential
//Step 4.1 (If the credential match) : Send succesfull message to user
//Step 4.1.1 : Stop the process
//Step 4.2 (If credentials does not match ):
//Step 4.2.2 : Find the user
//Step
