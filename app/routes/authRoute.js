const { response } = require("express");
const express=require("express");
const path=require('path');
const UserController=require( path.join(__dirname,"../Controllers/userController"));
const app=express();



app.post("/register",UserController.signup);
app.post("/login",UserController.signin);


module.exports=app;
