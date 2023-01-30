const express=require('express');
var bodyParser = require('body-parser')
const mongoose= require('mongoose');
const path=require('path');
const cors=require('cors');
const foodRouter=require(path.join(__dirname,'./app/routes/foodRoutes'));
const authRouter=require(path.join(__dirname,'./app/routes/authRoutes'));

const app=express();



mongoose.connect(process.env.MONGODBURL || "mongodb://localhost:27017/foodDB");

//cors 
app.use(cors({
    origin: '*'
}));

var db=mongoose.connection;

db.on('error',()=>{
    console.log("DB unable to connect")
});

db.on('open',()=>{
    console.log("connection successful")
})


// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(authRouter);



app.use(foodRouter);



app.listen( process.env.PORT || 3000,()=>{
    console.log(`web server is running at port ${process.env.port || 3000} `);
});