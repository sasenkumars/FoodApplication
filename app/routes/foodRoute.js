const { response } = require("express");
const express=require("express");
const path=require('path');
const foodControllors=require( path.join(__dirname,"../Controllers/foodController"));
const foodModel=require(path.join(__dirname,'../models/food'));
const app=express();

const authMiddleWare=require('../middlewares/authMiddleware');
const adminMiddleWare=require('../middlewares/adminMiddleWare');

app.use(authMiddleWare);

app.get("/foods",foodControllors.findAll);
app.get("/food/:id",foodControllors.findOne);
app.post("/food",foodControllors.create);
app.patch("/food/:id",adminMiddleWare,foodControllors.update);
app.delete("/food/:id",adminMiddleWare,foodControllors.delete);

module.exports=app;
