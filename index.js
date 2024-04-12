// main server point for the application. ( main file)

// importing the packages. (express.)
const express = require('express');

// creating an express application. 
const app = express();

//defining the port 
const PORT = 5000;

//making a test endpoint. 






// starting the server. 
app.listen(PORT, () => {
    console.log(`Server-app is running on port ${PORT}`);
});