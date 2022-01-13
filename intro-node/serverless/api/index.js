
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const meals = require('./routes/meals');
const orders = require('./routes/orders');
const auth = require('./routes/auth');


const app = express();
app.use(bodyParser.json());
app.use(cors());
// MondoDB Connection
const db_url = "mongodb+srv://matifbarra:Supermati8@cluster0.jx3q0.mongodb.net/almuerzi-db?retryWrites=true&w=majority"
mongoose.connect(db_url,{useNewUrlParser:true,useUnifiedTopology:true});


// using express(via app) to pass requests (that contains 'api/meals' 'api/orders') 
//to directories containing the respectives js files.   
app.use('/api/meals', meals);
app.use('/api/orders', orders);
app.use('/api/auth', auth);

const server = app.listen(3000, () => {
    console.log('server running at port 3000 coño...')
})
// exporting app to others modules
module.exports = app;



