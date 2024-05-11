// main server point for the application. ( main file)

// importing the packages. (express.)
const express = require('express');
// const mongoose = require('mongoose'); // connecting the database with the server.
const connectDatabase = require('./database/database');
const dotenv = require('dotenv');
const cors = require('cors');

// creating an express application. 
const app = express();
app.use(express.json())

//cinfigure cors policy
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,

}
app.use(cors(corsOptions))

//dotenv configuration
dotenv.config()

//connecting to databas 
connectDatabase()

//defining the port 
const PORT = process.env.PORT;

//making a test endpoint. 
// EndPoints : POST, GET, PUT, DELETE
app.get('/test', (req, res) => {
    res.send('Hello World, test api is working.');
})

//http://localhost:5000/api/user/create

//configuring routes
app.use('/api/user', require('./routes/userRoutes'))


// starting the server. 
app.listen(PORT, () => {
    console.log(`Server-app is running on port ${PORT}`);
});

