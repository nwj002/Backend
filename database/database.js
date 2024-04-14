const mongoose = require('mongoose');

//external file
//function (connection)
//make a unique function name
// export

const connectDatabase = () => {
    mongoose.connect('mongodb+srv://test:test@cluster0.0jbdrrl.mongodb.net/').then(()=>{ 
    console.log('Database connected');
})
} 

//exportinf the function
module.exports = connectDatabase;