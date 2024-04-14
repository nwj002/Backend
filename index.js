// main server point for the application. ( main file)

// importing the packages. (express.)
const express = require('express');
const mongoose = require('mongoose'); // connecting the database with the server.
const connectDatabase = require('./database/database');

// creating an express application. 
const app = express();

//connecting to databas 
connectDatabase()

//defining the port 
const PORT = 5000;

//making a test endpoint. 
// EndPoints : POST, GET, PUT, DELETE
app.get('/test', (req,res)=> {
    res.send('Hello World, test api is working.');
})

//http://localhost:5000/test


// starting the server. 
app.listen(PORT, () => {
    console.log(`Server-app is running on port ${PORT}`);
});