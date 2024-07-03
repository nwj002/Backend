//import jwt token
const jwt = require('jsonwebtoken');

const authGuard = (req, res, next) => {

    //check incomming data
    console.log(req.headers);
    //get authorization data from the (req)request header
    const authHeader = req.headers.authorization;
    //check or validate the authorization data
    if (!authHeader) {
        return res.status(400).json({
            "success": false,
            "message": "Authorization header not found"
        })
    }
    //split the data (Format: 'Bearer token-random') -- take only token
    const token = authHeader.split(' ')[1];
    //if tokne not found: stop the process or send response
    if (!token || token === "") {
        return res.status(400).json({
            "success": false,
            "message": "Token not found"
        })
    }
    //verify the token
    try {
        const decodeUserData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodeUserData;
        next();
    } catch (error) {
        return res.status(400).json({
            "success": false,
            "message": "Not Authenticated",
            // "error": error
        })

    }


    //if verifued then next(function in controller)
    //if not verified : not auth

}

//admin guard
const adminGuard = (req, res, next) => {

    //check incomming data
    console.log(req.headers);
    //get authorization data from the (req)request header
    const authHeader = req.headers.authorization;
    //check or validate the authorization data
    if (!authHeader) {
        return res.status(400).json({
            "success": false,
            "message": "Authorization header not found"
        })
    }
    //split the data (Format: 'Bearer token-random') -- take only token
    const token = authHeader.split(' ')[1];
    //if tokne not found: stop the process or send response
    if (!token || token === "") {
        return res.status(400).json({
            "success": false,
            "message": "Token not found"
        })
    }
    //verify the token
    try {
        const decodeUserData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodeUserData; // id isadmin
        if (!req.user.isAdmin) {
            return res.status(400).json({
                "success": false,
                "message": "You are not authorized to access this route"
            })
        }
        next();
    } catch (error) {
        return res.status(400).json({
            "success": false,
            "message": "Not Authenticated",
            // "error": error
        })

    }


    //if verifued then next(function in controller)
    //if not verified : not auth

}

module.exports = {
    authGuard,
    adminGuard
}